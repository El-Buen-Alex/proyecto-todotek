<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $products=Product::
                with([
                    'category'
                ])
                ->get();

            $this->apiResponse->addData('products', $products);
        }catch(Exception $e){
            $this->apiResponse->addErrorMessage('Ha ocurrido un error', $e->getMessage());
        }
        return $this->result();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            DB::beginTransaction();
            $validator = Validator::make($request->all(), [
                'category_id'=>['required', 'integer', 'exists:categories,id'],
                'name'=>['required', 'string'],
            ], [
                'category_id.required'=>'El campo categoría es requerido',
                'category_id.integer'=>'El campo categoría debe ser entero',
                'category_id.exists'=>'La categoría solicitada no existe o no esta activa',
                'name.required'=>'El campo nombre es requerido',
                'name.string'=>'El campo debe ser cadena de texto',
            ]);

            if ($validator->stopOnFirstFailure()->fails()) {
                throw new Exception($validator->errors()->first());
            }

            $inputs=[
                'name'=>$request->name, 
                'category_id'=>$request->category_id
            ];

            $product=Product::create($inputs);

            $this->apiResponse->addSuccessMessage('Producto creado', 'Se ha creado correctamente el producto', $product->name);
            $this->apiResponse->addData('product', $product);
            DB::commit();

        }catch(Exception $e){
            DB::rollBack();
            $this->apiResponse->addErrorMessage('Ha ocurrido un error', $e->getMessage());
        }
        return $this->result();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try{
            DB::beginTransaction();
            $validator = Validator::make($request->all(), [
                'category_id'=>['required', 'integer', 'exists:categories,id'],
                'name'=>['required', 'string'],
            ], [
                'category_id.required'=>'El campo categoría es requerido',
                'category_id.integer'=>'El campo categoría debe ser entero',
                'category_id.exists'=>'La categoría solicitada no existe o no esta activa',
                'name.required'=>'El campo nombre es requerido',
                'name.string'=>'El campo debe ser cadena de texto',
            ]);

            if ($validator->stopOnFirstFailure()->fails()) {
                throw new Exception($validator->errors()->first());
            }

            $inputs=[
                'name'=>$request->name, 
                'category_id'=>$request->category_id
            ];

            $product=Product::find($id);
            $product->update($inputs);
            $product->refresh();

            $this->apiResponse->addSuccessMessage('Producto actualizado', 'Se ha actualizado correctamente el producto', $product->name);
            $this->apiResponse->addData('product', $product);
            DB::commit();

        }catch(Exception $e){
            DB::rollBack();
            $this->apiResponse->addErrorMessage('Ha ocurrido un error', $e->getMessage());
        }
        return $this->result();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
            DB::beginTransaction();


            $product=Product::find($id);
            $product->delete();
            $this->apiResponse->addSuccessMessage('Producto eliminado', 'Se ha eliminado correctamente el producto', $product->name);
            DB::commit();

        }catch(Exception $e){
            DB::rollBack();
            $this->apiResponse->addErrorMessage('Ha ocurrido un error', $e->getMessage());
        }
        return $this->result();
    }
}
