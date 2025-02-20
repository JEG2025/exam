<?php

namespace App\Services\DataProviders;

use App\Interfaces\DataProviderInterface;
use App\Services\DataProviderAbstract;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Cache;

class FinancialModelingPrepAPIService extends DataProviderAbstract implements DataProviderInterface
{

    private $baseUrl;
    private $apiKey;

    public function __construct()
    {
        $this->baseUrl = config('client.provider.fmp.url');
        $this->apiKey = config('client.provider.fmp.apiKey');
    }

    public function getCompanyProfile(string $symbol)
    {
        $cacheKey = "fmp//profile//$symbol";

        if (Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        $url = url($this->baseUrl . "/profile/" . $symbol);

        $response = $this->makeGetRequest($url, $this->apiKey)[0];

        Cache::put($cacheKey, $response, now()->addMinutes(3));

        return $response;
    }

    public function getCompanyQuote(string $symbol)
    {
        $cacheKey = "fmp//quote//$symbol";

        if (Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        $url = url($this->baseUrl . "/quote/" . $symbol);

        $response = $this->makeGetRequest($url, $this->apiKey)[0];

        $formattedResponse = $this->formattedResponse($response);

        Cache::put($cacheKey, $formattedResponse, now()->addMinutes(3));

        return $formattedResponse;
    }

    private function formattedResponse(array $response)
    {
        try {
            $response['earningsAnnouncement'] = Carbon::parse($response['earningsAnnouncement'])->format('M d, Y h:i a');
            $response['timestamp'] = Carbon::parse($response['timestamp'])->format('M d, Y h:i a');
            return $response;
        } catch (Exception $e) {
            return $response;
        }
    }
}
