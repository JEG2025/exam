<?php

namespace App\Interfaces;

interface DataProviderInterface
{
    public function getCompanyProfile(string $symbol);

    public function getCompanyQuote(string $symbol);
}