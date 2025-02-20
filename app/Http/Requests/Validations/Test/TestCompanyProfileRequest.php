<?php

namespace App\Http\Requests\Validations\Test;

use App\Interfaces\CompanyProfileRequestInterface;

class TestCompanyProfileRequest implements CompanyProfileRequestInterface
{
    public function rules()
    {
        return [
            'symbol' => 'required|string',
            'test' => 'sometimes|string',
        ];
    }
}