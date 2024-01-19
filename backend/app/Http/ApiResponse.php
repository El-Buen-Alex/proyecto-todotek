<?php

namespace App\Http;
use Illuminate\Support\Str;

class ApiResponse{

    private $message = [];
    private $data = [];
    private $status = true;
    private $token = false;

    public function setToken( $data ) {
        $this->token = $data;
    }

    public function getToken() {
        return $this->token;
    }

    public function addErrorMessage( $reason , $message ) {
        $this->status = false;
        $this->setMessage( 'error' , $reason , $message );
    }

    public function addWarningMessage( $reason , $message ) {
        $this->status = false;
        $this->setMessage( 'warning' , $reason , $message );
    }

    public function addSuccessMessage( $reason , $message ) {
        $this->setMessage( 'success' , $reason , $message );
    }

    public function addInfoMessage( $reason , $message ) {
        $this->setMessage( 'info' , $reason , $message );
    }

    public function setMessage( $type , $reason , $message ) {
        $this->message = [
            'title' => $reason,
            'type' => Str::slug( $type ),
            'description' => $message
        ];
    }

    public function setData( $data ) {
        $this->data = $data;
    }


    public function getData() {
        return $this->data;
    }

    public function addData( $key , $object ) {
        $this->data[$key] = $object;
    }

    public function getDataByKey( $key ) {
        return $this->data[$key];
    }


    public function toJSON() {
        return response()->json([
            'message'       => $this->message ,
            'data'          => $this->data ,
            'status'        => $this->status ,
        ]);
    }
}
