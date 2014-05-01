function BoardRepo(updateDoneCallback) {
    this.GetBoardItems = function (boardId) {
        var ret;
        $.ajax({
            async: false,
            type: 'GET',
            url: 'http://localhost:61346/api/values/?boardIdforItems='+boardId,
            
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
            url: 'http://localhost:61346/api/values/?boardIdforCategory=' + boardId,

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
            url: 'http://localhost:61346/api/values/?boardIdForUser=' + boardId,

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
            url: 'http://localhost:61346/api/values/?boardId=' + boardId + '&&categoryName=' + categoryNmae,

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
            url: 'http://localhost:61346/api/values/?boardId=' + boardId + '&&CategoryId=' + CategoryId + '&&ItemName=' + ItemName + '&&color=' + color + '&&Description=' + Description,

            success: function (data) {
                ret = data;
            }
        });

        
        return ret;
    }

    this.UpdateItem = function (boardId, CategoryId, ItemName, color, Description,ItemId) {
        var ret;

        $.ajax({
            async: false,
            type: 'GET',
            url: 'http://localhost:61346/api/values/?boardId=' + boardId + '&&CategoryId=' + CategoryId + '&&ItemName=' + ItemName + '&&color=' + color + '&&Description=' + Description + '&&ItemId=' + ItemId,

            success: function (data) {
                updateDoneCallback(boardId);
            }
        });

        return ret;
    }

    this.PostItem = function (Item) {
        var ret;

        $.ajax({
            type: "POST",
            data: JSON.stringify(Item),
            url: "http://localhost:61346/api/values",
            contentType: "application/json",
            success: function (data) {

                if (data > 0)
                {
                    ret = data;
                }

            }
        });


        return ret;
    }

}