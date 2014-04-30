function BoardRepo() {

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

}