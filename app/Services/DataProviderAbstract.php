<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use Illuminate\Support\Facades\Log;
use Nette\NotImplementedException;

abstract class DataProviderAbstract
{
    protected function makeGetRequest(string $url, string $apiKey = null)
    {
        try {
            $queryParams = $apiKey ? ['apikey' => $apiKey] : [];

            $result = Http::get($url, $queryParams)->json();

            if (array_keys($result)[0] === "Error Message") {
                throw new Exception($result["Error Message"]);
            }

            return $result;
        } catch (Exception $e) {
            Log::error('Cannot consume URL: ' . $url, [
                'message' => $e->getMessage(),
                'stack_trace' => $e->getTraceAsString()
            ]);

            throw new UnprocessableEntityHttpException('Cannot retrieve details for this company.');
        }
    }
}
