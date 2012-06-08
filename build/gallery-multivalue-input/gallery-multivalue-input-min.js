YUI.add("gallery-multivalue-input",function(d){function k(l){k.superclass.constructor.apply(this,arguments);}var g=d.Lang,j="multivalueinput",e=d.ClassNameManager.getClassName,a=e(j,"content"),h=e(j,"list"),b=e(j,"listitem"),c=e(j,"ul"),f=e(j,"input"),i=d.Node;k.NAME="multiValueInput";k.NS="mvi";k.ATTRS={values:{value:[],validator:function(l){return g.isArray(l);}},placeholder:{value:"type here"}};k.DIV_TEMPLATE="<div class={div_class}></div>";k.VALUE_HOLDER_TEMPLATE="<ul class={ul_class}></ul>";k.LI_TEMPLATE="<li class={list_class}>{item}</li>";k.INPUT_TEMPLATE="<input type='text' placeholder={placeholder} class={input_class}></input>";k.ITEM_REMOVE="<a href='javascript:void(0)'>,</a>";d.extend(k,d.Plugin.Base,{initializer:function(){var l=this.get("values"),n=this.get("placeholder");this._host=this.get("host");this._host.set("placeholder",n);this._divContent=this._createDivNode();this._host.insert(this._divContent,"before");this._ul=this._createULNode();if(l){for(var m=0;m<l.length;m++){this._ul.appendChild(this._createListNode(l[m],true));}}this._host.addClass(f);this._inputWrapper=this._createListNode("");this._inputWrapper.appendChild(this._host);this._ul.appendChild(this._inputWrapper);this._divContent.appendChild(this._ul);if(this._host.ac){this._host.ac.after("select",this._appendItem,this);}else{this._host.after("change",this._appendItem,this);}this._host.after("blur",function(){this._host.set("value","");this._divContent.removeClass("yui3-multivalueinput-border");},this);this._host.after("focus",function(){this._host.set("value","");this._divContent.addClass("yui3-multivalueinput-border");},this);},destructor:function(){},_createULNode:function(){return i.create(d.substitute(k.VALUE_HOLDER_TEMPLATE,{ul_class:c}));},_createListNode:function(o,m){var n,l;if(m){l=i.create(d.substitute(k.ITEM_REMOVE));n=i.create(d.substitute(k.LI_TEMPLATE,{item:o,list_class:h}));n.appendChild(l);l.on("click",d.bind(this._removeItem,this,n));n.addClass(b);}else{n=i.create(d.substitute(k.LI_TEMPLATE,{item:o,list_class:h}));}return n;},_createDivNode:function(){return i.create(d.substitute(k.DIV_TEMPLATE,{div_class:a}));},_getListIndex:function(o){var n=this._ul.get("children"),m=n.size();for(var l=0;l<m;l++){if(o.compareTo(n.item(l))){return l;}}return -1;},_appendItem:function(){var l=this._host.get("value");this._inputWrapper.insert(this._createListNode(l,true),"before");this._addValue(l);this._host.set("value","");},_removeItem:function(m){var l=this._getListIndex(m);this._host.focus();m.get("parentNode").removeChild(m);this._removeValue(l);},_addValue:function(m){var l=this.get("values");l.push(m);},_removeValue:function(m){var l=this.get("values"),n=l[m];l.splice(m,1);}});d.MultiValueInput=k;},"@VERSION@",{requires:["plugin","substitute","node"],skinnable:true});