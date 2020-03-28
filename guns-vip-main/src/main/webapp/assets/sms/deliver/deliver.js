layui.use(['table', 'admin', 'ax','laydate'], function () {
    var $ = layui.$;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;
    var laydate = layui.laydate;

    /**
     * 短信接收表管理
     */
    var Deliver = {
        tableId: "deliverTable"
    };

    /**
     * 初始化表格的列
     */
    Deliver.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'deliverId', hide: true, title: '主键ID'},
            {field: 'entityName', sort: true, title: '用户名'},
            {field: 'destid', sort: true, title: '源号码'},
            {field: 'srcterminalid', sort: true, title: '目的号码'},
            {field: 'msgContent', sort: true, title: '上行内容'},
            {field: 'msgId', sort: true, title: 'Msgid'},
            {field: 'sequenceId', hide: true,sort: true, title: 'sequenceId'},
            // {field: 'status', sort: true, title: '状态0,未发送，1己发送'},
            {
                field: 'status', align: "center", sort: true, title: '状态', templet: function (d) {
                    if (d.status === 0) {
                        return "未发送";
                    }else if (d.status === 1){
                        return "己发送";
                    }else if (d.status === 2){
                        return "发送失败";
                    }
                }
            },
            {field: 'submitDate', sort: true, title: '提交时间'},
            {field: 'dealDate', sort: true, title: '处理时间'}
        ]];
    };
//执行一个laydate实例
    laydate.render({
        elem: '#submitDate' //指定元素
        ,format: 'yyyy-MM-dd' //可任意组合
        ,value: new Date()
        ,isInitValue: true //是否允许填充初始值，默认为 true
        // ,show: true //直接显示
    });
    /**
     * 点击查询按钮
     */
    Deliver.search = function () {
        var queryData = {};
        // queryData['condition'] = $("#condition").val();
        queryData['srctterminalId'] = $("#srctterminalId").val();
        queryData['submitDate'] = $("#submitDate").val();
        queryData['entityName'] = $("#entityName").val();
        table.reload(Deliver.tableId, {
            where: queryData, page: {curr: 1}
        });
    };


    /**
     * 导出excel按钮
     */
    Deliver.exportExcel = function () {
        var checkRows = table.checkStatus(Deliver.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };




    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Deliver.tableId,
        url: Feng.ctxPath + '/deliver/list',
        where:{"submitDate":Feng.currentDate},
        page: true,
        height: "full-158",
        cellMinWidth: 100,
        cols: Deliver.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Deliver.search();
    });


    // 导出excel
    $('#btnExp').click(function () {
        Deliver.exportExcel();
    });

});
