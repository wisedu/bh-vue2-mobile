var EMAPDataAdapter = function(meta){
    var _category_meta;

    function _loadMeta(controls, onLoadMeta){
        if(controls === undefined || controls === null || controls.length == 0){
            console.log("传入controls为空，不做刷新处理");
            console.trace();
            return;
        }
        var category_meta = {
            default:[],
            form:[], 
            grid:[], 
            search:[]
        }
        Object.defineProperty(category_meta, 'default', {
            enumerable: false
        });
        
        for (var control_index = 0; control_index < controls.length; control_index++) {
            var control = controls[control_index];

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
            control["smile_hidden"] = control.hidden;
            control["smile_readonly"] = control.readonly;

            if(typeof(onLoadMeta) === "function"){
                control = onLoadMeta(control);
            }

            //行控件对象复制
            category_meta["default"].push(JSON.parse(JSON.stringify(control)));

            //EMAP中，字段有类型的作用范围，在此预先生成作用范围
            for (var type in category_meta) {
                var type_meta = category_meta[type];
                
                var type_control = {};
                for (var key in control) {
                    if(key.indexOf(type+".") > -1){
                        var shortkey = key.substr(key.indexOf(type+".") + (type+".").length);
                        type_control[shortkey] = control[key];
                    }else if(key.indexOf(".") == -1){
                        type_control[key] = control[key];
                    }
                }
                type_meta.push(type_control);
            }
        }
        return category_meta;
    }

    if(meta !== undefined)_category_meta = _loadMeta(meta);

    return {
        execute: function(action, data){
            return smile.post(action.url, data)
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
        meta: function(type){
            if(type === undefined){
                return _category_meta["default"];
            }else{
                return _category_meta[type];
            }
        },
        load: function(uri, modelName){
            var self = this;
            return axios.get(uri, {params:{"*json":1}}).then(function(res){
                var data = res.data;
                if(typeof(self.events.onLoad) === "function"){
                    data = self.events.onLoad(data);
                }

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

            if(typeof(this.events.onRefreshed) === "function"){
                _category_meta = this.events.onRefreshed(_category_meta);
            }
        },
        loadMeta: function(controls){
            _category_meta = _loadMeta(controls, this.events.onLoadMeta);
        }
    }
};