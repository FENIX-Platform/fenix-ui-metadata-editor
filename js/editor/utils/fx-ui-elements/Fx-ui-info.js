define([
    "jquery"
], function ($) {

    //Public Component
    function Fx_Info() {
    }


    Fx_Info.prototype.createPopOver = function (item, content, position){
        var direction = position == null || position == 'undefined' ? 'left' : position;
        item.popover({
            content: content,
            trigger: 'focus',
            placement: direction
        });
    };



    Fx_Info.prototype.createModal = function (item, content, modalId){
        var url = content;

         item.on("click", { module: ""}, function (e) {
            e.preventDefault();
            var myModal = $(modalId),
                modalBody = myModal.find('.modal-body');
            // load content into modal
            modalBody.load(url);
            // display modal
            myModal.modal('show');
        });
    };


    Fx_Info.prototype.init = function () { };

    //Public API
    return Fx_Info;

});