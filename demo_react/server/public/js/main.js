var dateHandler = {
    init: () => {
        $('.datepicker').datepicker();
        if ($('.dateFormat .dateVal').val()) {
            $('.dateFormat').each(function () {
                var dateVal = $(this).find('.dateVal').val();
                console.log(dateVal);
                $(this).find('.datepicker').datepicker('setDate', dateVal);
            })


        }

    }
};
$(document).ready(function () {
    dateHandler.init();
})