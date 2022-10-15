export default class KanbanAPI {
    static Methode(TypeMethode, requestUri, BodyData = null, callback) {
        var data;
        const Get = $.ajax({
            type: `${TypeMethode}`,
            url: `/${requestUri}`,
            data: BodyData ? BodyData : null,
            success: function (resp) {
                data = resp;
                callback(data);
            }
        }).fail((error) => {
            console.log(error);
        });
        console.log(Get)
        return data;
    }
    static updateItem(itemId, newProps) {
        var data = {};
        data["CardId"] = itemId;
        this.Methode("GET", "list/GetCard", data, function (d) {

            const currentColumn = document.querySelector(`[data-list_id="${d.list_Id}"]`);

            const AllcardCC = currentColumn.getElementsByClassName("board__boxes");
            console.log(currentColumn);
            console.log(AllcardCC);
            if (AllcardCC.length != 0)
            {
                for (let index = 0; index < AllcardCC.length; index++) {
                    var cardId = AllcardCC[index].getAttribute("data-card_id");
                    var dataNew = {};
                    dataNew["CardId"] = cardId;
                    KanbanAPI.Methode("GET", "list/GetCard", dataNew, function (d) {
                        //processing the data
                        console.log(d);
                        d.order = index;
                        KanbanAPI.Methode("PUT", "list/EditCard", {
                            "id": d.id,
                            "name": d.name,
                            "order": d.order,
                            "description": d.description,
                            "deadLine": d.deadLine,
                            "list_Id": d.list_Id,
                            "personInCharge": d.personInCharge
                        }, function (d) {
                            //processing the data
                            console.log(d);
                        });
                    });
                }
            }
            
            const targetColumn = document.querySelector(`[data-list_id="${newProps.columnId}"]`);
            const AllcardTC = targetColumn.getElementsByClassName("board__boxes");
            
            console.log(targetColumn);
            console.log(AllcardTC);
            if (AllcardTC.length != 0) {
                for (let index = 0; index < AllcardTC.length; index++) {
                    var cardId =AllcardTC[index].getAttribute("data-card_id");
                    var dataNew = {};
                    dataNew["CardId"] = cardId;
                    KanbanAPI.Methode("GET", "list/GetCard", dataNew, function (d) {
                        //processing the data
                        console.log(d);
                        if (d.id == itemId) {
                            d.list_Id = newProps.columnId;
                        };
                        d.order = index;
                        console.log(d);
                        KanbanAPI.Methode("PUT", "list/EditCard", {
                            "id": d.id,
                            "name": d.name,
                            "order": d.order,
                            "description": d.description,
                            "deadLine": d.deadLine,
                            "list_Id": d.list_Id,
                            "personInCharge": d.personInCharge
                        }, function (d) {
                            //processing the data
                            console.log(d);
                        });
                    });
                    //disini update setiap card sesuai sama ordernya/ option selainnya cara dibawah
                }
            }
        });
    }
    static EditList(ListId) {
        alert("You want to edit list Id : " + ListId);
    }
    static DeleteList(ListId) {
        alert("You want to delete list Id : " + ListId);
    }
}