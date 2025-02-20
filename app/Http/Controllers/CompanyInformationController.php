<?php

namespace App\Http\Controllers;

use App\Interfaces\CompanyProfileRequestInterface;
use App\Interfaces\DataProviderInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CompanyInformationController extends Controller
{
    protected $dataProvider;
    protected $profileRequestValidator;

    public function __construct(
        DataProviderInterface $dataProvider,
        CompanyProfileRequestInterface $profileRequestValidator
    ) {
        $this->dataProvider = $dataProvider;
        $this->profileRequestValidator = $profileRequestValidator;
    }


    public function index()
    {
        return  Inertia::render('CompanyInformation');
    }

    public function getCompanyInformation(Request $request)
    {
        try {

            // request validation
            $validator = Validator::make($request->all(), $this->profileRequestValidator->rules());

            if ($validator->fails()) {
                return Inertia::render('CompanyInformation', ['errors' => $validator->errors()]);
            } else {
                $data = $validator->validated();
            }

            // this endpoint expects one result only
            $result = $this->dataProvider->getCompanyProfile($data['symbol']);

            $response = [
                'company_profile' => $result
            ];

            return Inertia::render('CompanyInformation', ['data' => $response]);
        } catch (Exception $e) {
            return Inertia::render('CompanyInformation', ['errors' => [
                'exception' => $e->getMessage()
            ]]);
        }
    }
}
