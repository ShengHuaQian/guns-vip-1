layui.use(['table', 'admin', 'ax'], function () {
    var $ = layui.$;
    var table = layui.table;
    var $ax = layui.ax;
    var admin = layui.admin;

    /**
     * 签名配置表管理
     */
    var Signname = {
        tableId: "signnameTable"
    };

    /**
     * 初始化表格的列
     */
    Signname.initColumn = function () {
        return [[
            {type: 'checkbox'},
            {field: 'signid', hide: true, title: '主键ID'},
            {field: 'signname', sort: true, title: '签名'},
            {field: 'entid', sort: true, title: '企业ID'},
            // {field: 'signtype', sort: true, title: '签名类型'},
            {
                field: 'signtype', align: "center", sort: true, title: '签名类型', templet: function (d) {
                    if (d.signtype == 0) {
                        return "行业短信";
                    } else if (d.signtype == 1){
                        return "游戏";
                    }else if (d.signtype == 2){
                        return "信用卡";
                    }else if (d.signtype == 3){
                        return "网贷";
                    }else if (d.signtype == 4){
                        return "通知类";
                    }else{
                        return "其它";
                    }
                }
            },
            {field: 'remark', sort: true, title: '短信模板'},
            // {field: 'status', sort: true, title: '状态0,可用，1不可用，2，审核中，3驳回'},
            {
                field: 'status', align: "center", sort: true, title: '状态', templet: function (d) {
                    if (d.status == 0) {
                        return "启用";
                    } else if(d.status == 1) {
                        return "禁用";
                    } else if(d.status == 2) {
                        return "审核中";
                    } else if(d.status == 3) {
                        return "己驳回";
                    }
                }
            },
            {field: 'adddate', sort: true, title: '添加时间'},
            {align: 'center', toolbar: '#tableBar', title: '操作'}
        ]];
    };

    /**
     * 点击查询按钮
     */
    Signname.search = function () {
        var queryData = {};
        queryData['condition'] = $("#condition").val();
        table.reload(Signname.tableId, {
            where: queryData, page: {curr: 1}
        });
    };

    /**
     * 弹出添加对话框
     */
    Signname.openAddDlg = function () {
        window.location.href = Feng.ctxPath + '/signname/add';
    };

    /**
     * 导出excel按钮
     */
    Signname.exportExcel = function () {
        var checkRows = table.checkStatus(Signname.tableId);
        if (checkRows.data.length === 0) {
            Feng.error("请选择要导出的数据");
        } else {
            table.exportFile(tableResult.config.id, checkRows.data, 'xls');
        }
    };

    /**
     * 点击编辑
     *
     * @param data 点击按钮时候的行数据
     */
    Signname.openEditDlg = function (data) {
        window.location.href = Feng.ctxPath + '/signname/edit?signid=' + data.signid;
    };

    /**
     * 点击删除
     *
     * @param data 点击按钮时候的行数据
     */
    Signname.onDeleteItem = function (data) {
        var operation = function () {
            var ajax = new $ax(Feng.ctxPath + "/signname/delete", function (data) {
                Feng.success("删除成功!");
                table.reload(Signname.tableId);
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("signid", data.signid);
            ajax.start();
        };
        Feng.confirm("是否删除?", operation);
    };

    // 渲染表格
    var tableResult = table.render({
        elem: '#' + Signname.tableId,
        url: Feng.ctxPath + '/signname/list',
        page: true,
        height: "full-158",
        cellMinWidth: 100,
        cols: Signname.initColumn()
    });

    // 搜索按钮点击事件
    $('#btnSearch').click(function () {
        Signname.search();
    });

    // 添加按钮点击事件
    $('#btnAdd').click(function () {
        Signname.openAddDlg();
    });

    // 导出excel
    $('#btnExp').click(function () {
        Signname.exportExcel();
    });

    // 工具条点击事件
    table.on('tool(' + Signname.tableId + ')', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;

        if (layEvent == 'edit') {
            Signname.openEditDlg(data);
        } else if (layEvent == 'delete') {
            Signname.onDeleteItem(data);
        }
    });
});
