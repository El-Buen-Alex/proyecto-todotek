<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'controller'=>CategoryController::class,
    'prefix'=>'category'
], function() {
    Route::get('', 'index');
} ) ;
Route::group([
    'controller'=>ProductController::class,
    'prefix'=>'product'
],function(){
    Route::get('edit/{id}', 'edit')->where(['id' => '[0-9]+']);
});
Route::apiResource('product', ProductController::class);

