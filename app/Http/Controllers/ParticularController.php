<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use App\Particular;
class ParticularController extends Controller
{
    public function getParticulars(){
        return view('pages.modules.maintenance.particular.particulars');
    }

    public function validateRequest($request){
        return Validator::make($request->all(), [
            'particular' => 'required|max:100',
            'account_code' => 'required',
        ]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $particulars = Particular::where('particular', 'like', '%P%')->orderBy('particular', 'asc')->paginate(5);
        return response()->json($particulars);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = $this->validateRequest($request);
        if ($validator->fails()) {
            return response()->json(['success'=>false, 'error'=>$validator->errors()]);
        }else{
            $particular = Particular::create($request->all());
            return response()->json(['success'=>true, 'data'=>$particular]);
        }
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
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
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
        $validator = $this->validateRequest($request);
        if ($validator->fails()) {
            return response()->json(['success'=>false, 'error'=>$validator->errors()]);
        }else{
            $particular = Particular::find($id)->update($request->all());
            return response()->json(['success'=>$particular]);
        }
        
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = Particular::find($id)->delete();
        return response()->json([$result]);
    }
}
