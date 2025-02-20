<?php

namespace App\Http\Controllers;

use App\Interfaces\CompanyQuoteRequestInterface;
use App\Interfaces\DataProviderInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CompanyQuoteController extends Controller
{
    protected $dataProvider;
    protected $quoteRequestValidator;

    public function __construct(
        DataProviderInterface $dataProvider,
        CompanyQuoteRequestInterface $quoteRequestValidator
    ) {
        $this->dataProvider = $dataProvider;
        $this->quoteRequestValidator = $quoteRequestValidator;
    }

    public function index()
    {
        return  Inertia::render('CompanyQuote');
    }

    public function getFullCompanyQuote(Request $request)
    {
        try {
            // request validation
            $validator = Validator::make($request->all(), $this->quoteRequestValidator->rules());

            if ($validator->fails()) {
                return Inertia::render('CompanyQuote', ['errors' => $validator->errors()]);
            } else {
                $data = $validator->validated();
            }

            // this endpoint expects one result only
            $result = $this->dataProvider->getCompanyQuote($data['symbol']);

            $response = [
                'full_quote' => $result
            ];

            return Inertia::render('CompanyQuote', ['data' => $response]);
        } catch (Exception $e) {
            return Inertia::render('CompanyQuote', ['errors' => [
                'exception' => $e->getMessage()
            ]]);
        }
    }
}
