<?php

namespace App\Http\Requests\Validations\Test;

use App\Interfaces\CompanyQuoteRequestInterface;

class TestCompanyQuoteRequest implements CompanyQuoteRequestInterface
{
    public function rules()
    {
        return [
            'symbol' => 'required|string',
            'test' => 'sometimes|string',
        ];
    }
}