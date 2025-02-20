<?php

namespace App\Services\DataProviders;
use App\Interfaces\DataProviderInterface;
use App\Services\DataProviderAbstract;
use Nette\NotImplementedException;

class TestAPIService extends DataProviderAbstract implements DataProviderInterface
{

    public function getCompanyProfile(string $symbol)
    {
        throw new NotImplementedException(' Internal Server Error');
    }

    public function getCompanyQuote(string $symbol)
    {
        throw new NotImplementedException(' Internal Server Error');
    }
}