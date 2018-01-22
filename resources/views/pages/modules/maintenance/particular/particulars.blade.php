@extends('main')

@section('content')
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <button id="btn-create" class="btn btn-success btn-block" data-toggle="modal" data-target="#create-particular">Create</button>
            <br/>
        </div>
    </div>
    <div class="row">
        <div class="col-md-8 col-md-offset-2">  
            <table class="table table-bordered">
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>Details</th>
                    <th width="200px">Action</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>

    <div class="row">
        <div class="col-md-8 col-md-offset-2">  
            <div id="paging" class="col-md-12 text-center"></div>
        </div>
    </div>
    @include('pages.modules.maintenance.particular.create')
    @include('pages.modules.maintenance.particular.edit')

@endsection

@section('scripts')

    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twbs-pagination/1.3.1/jquery.twbsPagination.min.js"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/1000hz-bootstrap-validator/0.11.5/validator.min.js"></script> -->
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
    <link href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet">

    <script>var url = "<?php echo route('particularMethods.index'); ?>";</script>
    <script src="/js/particulars/Particulars.js"></script>
    
@endsection