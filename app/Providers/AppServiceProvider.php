<?php

namespace App\Providers;


use App\Http\Requests\Validations\FMP\FMPCompanyProfileRequest;
use App\Http\Requests\Validations\FMP\FMPCompanyQuoteRequest;
use App\Http\Requests\Validations\Test\TestCompanyProfileRequest;
use App\Http\Requests\Validations\Test\TestCompanyQuoteRequest;
use App\Interfaces\CompanyProfileRequestInterface;
use App\Interfaces\CompanyQuoteRequestInterface;
use App\Interfaces\DataProviderInterface;
use App\Services\DataProviders\FinancialModelingPrepAPIService;
use App\Services\DataProviders\TestAPIService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // switch between different implementations of company profile request validation
        $this->app->bind(CompanyProfileRequestInterface::class, function ($app) {
            switch (request()->client) {
                case 'test':
                    return new TestCompanyProfileRequest();
                case 'fmp':
                default:
                    return new FMPCompanyProfileRequest();
            }
        });

        // switch between different implementations of company quote request validation
        $this->app->bind(CompanyQuoteRequestInterface::class, function ($app) {
            switch (request()->client) {
                case 'test':
                    return new TestCompanyQuoteRequest();
                case 'fmp':
                default:
                    return new FMPCompanyQuoteRequest();
            }
        });

        // switch between different implementations of data provider
        $this->app->bind(DataProviderInterface::class, function ($app) {
            switch (request()->client) {
                case 'test':
                    return new TestAPIService();
                case 'fmp':
                default:
                    return new FinancialModelingPrepAPIService();
            }
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
