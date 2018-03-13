var EMAPDataAdapter = function(meta){
    var _category_meta;

    if(meta !== undefined){
        _category_meta = meta;
    }

    return {
        execute: function(action, data){
            var rootPath = window.WEBPACK_CONFIG_HOST || ''
            return smile.post(rootPath + action.url, data)
        },
        actions: {
            save:"",
            delete:"",
            find:"",
            get:""
        },
        events:{
            onLoad: null,
            onLoadMeta: null,
            onRefreshed: null
        },
        meta: function(){
            return _category_meta;
        },
        load: function(uri, modelName){
            var self = this;
            return axios.get(uri, {params:{"*json":1}}).then(function(res){
                var data = res.data;
                if(typeof(self.events.onLoad) === "function")data = self.events.onLoad(data);

                self.refresh(data, modelName);
                return self;
            })
        },
        refresh: function(data, modelName){
            for (var index = 0; index < data.models.length; index++) {
                var element = data.models[index];
                this.actions[element.name] = {
                    url: element.url,
                    method: "post"
                };
                //只有指定名称下的模型，被填充到默认模型对象中，用于显示
                if(element.name == modelName){
                    var controls = element.controls;
                    this.loadMeta(controls);
                }
            }
            if(typeof(this.events.onRefreshed) === "function")_category_meta = this.events.onRefreshed(_category_meta);
        },
        loadMeta: function(controls){
            if(controls === undefined || controls === null || controls.length == 0){
                console.log("传入controls为空，不做刷新处理");
                console.trace();
                return;
            }
            var category_meta = [];
            
            for (var i = 0; i < controls.length; i++) {
                var control = controls[i];
    
                control["smile_id"] = control.name;
                control["smile_name"] = control.caption;
                control["smile_type"] = control.dataType; //string/int/number
                control["smile_realtype"] = ""; //字典类型/表/虚拟实体
                control["smile_require"] = control.required;
                control["smile_collective"] = false;//返回结果是集合
                control["smile_selectable"] = true;
                control["smile_length"] = control.checkSize || control.dataSize;
                control["smile_scale"] = "";
                control["smile_children"] = [];
    
                if(typeof(this.events.onLoadMeta) === "function")control = this.events.onLoadMeta(control);
                //行控件对象复制
                category_meta.push(JSON.parse(JSON.stringify(control)));
            }
            _category_meta = category_meta;
        }
    }
};
