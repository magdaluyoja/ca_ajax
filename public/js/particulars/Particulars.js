;(function(global, $, toastr){
    let page = 1;
    let current_page = 1;
    let total_page = 0;
    let is_ajax_fire = 0;

    let Particular = function(form_action, particular, account_code, id){
        return new Particular.init(form_action, particular, account_code, id);
    }
    Particular.init = function(form_action, particular, account_code, id){
        this.id = id || "";
        this.form_action = form_action || "";
        this.particular = particular || "";
        this.account_code = account_code || "";
    }
    Particular.prototype = {
        manageDataPaging: function() {
            let self = this;
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
                            self.getPageData();
                        }
                    }
                });
                self.manageRow(data.data);
                is_ajax_fire = 1;
            });
        },

        getPageData: function() {
            let self = this;
            $.ajax({
                dataType: 'json',
                url: url,
                data: {page:page}
            }).done(function(data) {
                self.manageRow(data.data);
            });
        },

        manageRow: function(data) {
            let	rows = '';
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
        },

        saveData:function(){
            let self = this;
            $.ajax({
                dataType: 'json',
                type:'POST',
                url: self.form_action,
                data:{particular:self.particular, account_code:self.account_code}
            }).done(function(data){
                if(data.success){
                    self.manageDataPaging();
                    $(".modal").modal('hide');
                    toastr.success('Particular Created Successfully.', 'Success Alert', {timeOut: 5000});
                }else{
                    self.showError(data);
                }
            });
        },

        updateData:function(){
            let self = this;
            $.ajax({
                dataType: 'json',
                type:'PUT',
                url: self.form_action,
                data:{particular:self.particular, account_code:self.account_code}
            }).done(function(data){
                if(data.success){
                    self.getPageData();
                    $(".modal").modal('hide');
                    toastr.success('Particular Updated Successfully.', 'Success Alert', {timeOut: 5000});
                }else{
                    self.showError(data);
                }
            });
        },

        removeData:function(c_obj){
            let self = this;
            $.ajax({
                dataType: 'json',
                type:'delete',
                url: url + '/' + self.id,
            }).done(function(data) {
                if(data[0]){
                    c_obj.remove();
                    toastr.success('Particular Deleted Successfully.', 'Success Alert', {timeOut: 5000});
                    self.manageDataPaging();
                }else{
                    toastr.error("Unable to delete Particular", 'Error!', {timeOut: 5000});
                }
                
            });
        },

        showError:function(data){
            let error = data.error;
            let arr_errmsg = [];
            let result = "";
            for (let element in error) {
                result += `<label>${element.charAt(0).toUpperCase() + element.slice(1)}</label>
                            <ul>`;
                if( error.hasOwnProperty(element) ) {
                    arr_errmsg = error[element];
                    for(let msg in arr_errmsg){
                        result += `<li>${arr_errmsg[msg]}</li>`;
                    }
                } 
                result += `</ul>`;
                } 
            toastr.error(result, 'Error!', {timeOut: 5000});
        }

    }
    Particular.init.prototype = Particular.prototype;

    global.Particular = global.$P = Particular;
}(window, $, toastr));

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$('document').ready(function(){
    $P().manageDataPaging();

    $('.particular-submit').click(function(e){
        e.preventDefault();
        let form_action = $("#create-particular").find("form").attr("action");
        let particular = $("#create-particular").find("input[name='particular']").val();
        let account_code = $("#create-particular").find("input[name='account_code']").val();
        let newParticular = $P(form_action, particular, account_code);
        newParticular.saveData();
    });

    $("body").on("click",".edit-particular",function() {
        let id = $(this).parent("td").data('id');
        let particular = $(this).parent("td").prev("td").prev("td").text();
        let account_code = $(this).parent("td").prev("td").text();

        $("#edit-particular").find("input[name='particular']").val(particular);
        $("#edit-particular").find("input[name='account_code']").val(account_code);
        $("#edit-particular").find("form").attr("action",url + '/' + id);
    });

    $(".particular-submit-edit").click(function(e) {
        e.preventDefault();
        let form_action = $("#edit-particular").find("form").attr("action");
        let particular = $("#edit-particular").find("input[name='particular']").val();
        let account_code = $("#edit-particular").find("input[name='account_code']").val();
        let Particular = $P(form_action, particular, account_code);
        Particular.updateData();
        
    });
    
    $("body").on("click",".remove-particular",function() {
        let id = $(this).parent("td").data('id');
        let c_obj = $(this).parents("tr");
        let particular = $P('','','', id);
        particular.removeData(c_obj);
    });
});