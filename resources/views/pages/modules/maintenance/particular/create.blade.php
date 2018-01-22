<div id="create-particular" class="modal" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
	    <div class="modal-content">
		    <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		        <h5 class="modal-title">Create Particular</h5>
		    </div>
	      	<div class="modal-body">
				<form action="{{ route('particularMethods.store') }}">
					<input type="hidden" name="_token" value="{{ csrf_token() }}">
					<div class="form-group">
						<label class="form-label" for="title">Particular</label>
						<input type="text" name="particular" class="form-control">
					</div>
					<div class="form-group">
						<label class="form-label" for="account_code">Account Code</label>
						<input type="text" name="account_code"  class="form-control">
					</div>
					<div class="form-group">
						<input type="submit" class="btn btn-primary particular-submit form-control" value="Submit">
					</div>
				</form>
			</div>
	    </div>
  	</div>
</div>