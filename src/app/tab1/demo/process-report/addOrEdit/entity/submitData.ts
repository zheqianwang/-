export class SubmitData {
    dispatchorder: {
        id: null                // 报工单号
    };
    qty: null;                  // 完成数量
    operationtype: '3';        // 操作类型
    // noqualifiedqty: null;       // 不合格数量
    // workwasteqty: null;         // 工废数量
    // materialwasteqty: null;     // 废料数量
    // personinfo: {
    //     id: null;               //    加工工人id
    // };
    worker: null;                 //    加工工人名字
    equip: null;                //    加工设备名称
    equipid: null;                //    加工设备id
    selfchecker: {
        id: null
    };          //    自检人
    mutualchecker: {
        id: null
    };        //    互检人
    selfchecktime: null;  //    自检日期
    mutualchecktime: null; //    互检日期
    mdworkcenter: {
        id: null                // 工厂id
    };
    mofmplace: null;            //
    mdfactory: null;             //  工厂名
}
