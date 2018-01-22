;(function(global, $){
    
}(window, $));

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;

function manageDataPaging() {
    $.ajax({
        dataType: 'json',
        url: url,
        data: {page:page}
    }).done(function(data) {
        $('#paging').html('');
        $('#paging').append('<ul id="pagination" class="pagination-md"></ul>');
    	total_page = data.last_page;
    	current_page = data.current_page;
    	$('#pagination').twbsPagination({
	        totalPages: total_page,
	        visiblePages: current_page,
	        onPageClick: function (event, pageL) {
	        	page = pageL;
                if(is_ajax_fire != 0){
	        	  getPageData();
                }
	        }
	    });
    	manageRow(data.data);
        is_ajax_fire = 1;
    });
}

function getPageData() {
	$.ajax({
    	dataType: 'json',
    	url: url,
    	data: {page:page}
	}).done(function(data) {
		manageRow(data.data);
	});
}

function manageRow(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
	  	rows = rows + '<td>'+value.particular+'</td>';
	  	rows = rows + '<td>'+value.account_code+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'">';
        rows = rows + '<button data-toggle="modal" data-target="#edit-particular" class="btn btn-primary edit-particular">Edit</button> ';
        rows = rows + '<button class="btn btn-danger remove-particular">Delete</button>';
        rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});
	$("tbody").html(rows);
}

$('document').ready(function(){
    manageDataPaging();
    $('.particular-submit').click(function(e){
        e.preventDefault();
        var form_action = $("#create-particular").find("form").attr("action");
        var particular = $("#create-particular").find("input[name='particular']").val();
        var account_code = $("#create-particular").find("input[name='account_code']").val();
        $.ajax({
            dataType: 'json',
            type:'Particular',
            url: form_action,
            data:{particular:particular, account_code:account_code}
        }).done(function(data){
            manageDataPaging();
            $(".modal").modal('hide');
            toastr.success('Particular Created Successfully.', 'Success Alert', {timeOut: 5000});
        });
    });

    $("body").on("click",".edit-particular",function() {
        var id = $(this).parent("td").data('id');
        var particular = $(this).parent("td").prev("td").prev("td").text();
        var account_code = $(this).parent("td").prev("td").text();

        $("#edit-particular").find("input[name='particular']").val(particular);
        $("#edit-particular").find("input[name='account_code']").val(account_code);
        $("#edit-particular").find("form").attr("action",url + '/' + id);
    });

    $(".particular-submit-edit").click(function(e) {
        e.preventDefault();
        var form_action = $("#edit-particular").find("form").attr("action");
        var particular = $("#edit-particular").find("input[name='particular']").val();
        var account_code = $("#edit-particular").find("input[name='account_code']").val();
        
        $.ajax({
            dataType: 'json',
            type:'PUT',
            url: form_action,
            data:{particular:particular, account_code:account_code}
        }).done(function(data){
            getPageData();
            $(".modal").modal('hide');
            toastr.success('Particular Updated Successfully.', 'Success Alert', {timeOut: 5000});
        });
    });
    
    $("body").on("click",".remove-particular",function() {
        var id = $(this).parent("td").data('id');
        var c_obj = $(this).parents("tr");
        $.ajax({
            dataType: 'json',
            type:'delete',
            url: url + '/' + id,
        }).done(function(data) {
            c_obj.remove();
            toastr.success('Particular Deleted Successfully.', 'Success Alert', {timeOut: 5000});
            manageDataPaging();
        });
    });
});