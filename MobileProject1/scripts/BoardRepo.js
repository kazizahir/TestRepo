function BoardRepo(updateDoneCallback) {
    //var basePath = 'http://carddemo.mob.bd';
    var basePath = 'http://localhost:61346/';

    this.GetBoardItems = function (boardId) {
        var ret;
        $.ajax({
            async: false,
            type: 'GET',
            url: basePath + '/api/values/?boardIdforItems='+boardId,
            
            success: function (data) {
                var dataItem = JSON.parse(data);
                //alert(dataItem[0].Color);
                ret = dataItem;
            }
        });
        return ret;
    }

    this.GetCategories = function (boardId) {
        var ret;
        $.ajax({
            async: false,
            type: 'GET',
            url: basePath + '/api/values/?boardIdforCategory=' + boardId,

            success: function (data) {
                var dataItem = JSON.parse(data);
                //alert(dataItem[0].Color);
                ret = dataItem;
            }
        });
        return ret;
    }

    this.GetUsers = function (boardId) {
        var ret;
        $.ajax({
            async: false,
            type: 'GET',
            url: basePath + '/api/values/?boardIdForUser=' + boardId,

            success: function (data) {
                var dataItem = JSON.parse(data);
                //alert(dataItem[0].Color);
                ret = dataItem;
            }
        });
        return ret;
    }

    this.AddCategory = function (boardId,categoryNmae) {
        var ret;
        $.ajax({
            async: false,
            type: 'GET',
            url: basePath + '/api/values/?boardId=' + boardId + '&&categoryName=' + categoryNmae,

            success: function (data) {
                ret = data;
                updateDoneCallback(boardId);
            }
        });
        return ret;
    }

    this.AddItem = function (boardId, CategoryId, ItemName, color, Description) {
        var ret;

        $.ajax({
            async: false,
            type: 'GET',
            url: basePath + '/api/values/?boardId=' + boardId + '&&CategoryId=' + CategoryId + '&&ItemName=' + ItemName + '&&color=' + color + '&&Description=' + Description,

            success: function (data) {
                ret = data;
            }
        });

        
        return ret;
    }

    this.UpdateItem = function (boardId, CategoryId, ItemName, color, Description,ItemId) {
        var ret;

        $.ajax({
            async: true,
            type: 'GET',
            url: basePath + '/api/values/?boardId=' + boardId + '&&CategoryId=' + CategoryId + '&&ItemName=' + ItemName + '&&color=' + color + '&&Description=' + Description + '&&ItemId=' + ItemId,

            success: function (data) {
                updateDoneCallback(boardId);
            }
        });

        return ret;
    }

    this.DeleteItem = function(itemId){
        $.ajax({
            async: true,
            type: 'GET',
            url: basePath + '/api/values/?itemIdForDelete=' + itemId,

            success: function (data) {                
            }
        });
    }

    this.PostItem = function (Item) {
        //var ret;

        $.ajax({
            type: "POST",
            data: JSON.stringify(Item),
            url: basePath + '/api/values',
            contentType: "application/json",
            success: function (data) {

                //if (data > 0)
                //{
                //    ret = data;
                //}

            }
        });

    }

}