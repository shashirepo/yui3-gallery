YUI.add("gallery-formmgr",function(D){function O(U,T){if(arguments.length===0){return;}if(!T){T={};}this.form_name=U;this.status_node=D.one(T.status_node);this.enabled=true;this.default_value_map=T.default_value_map;this.validation={fn:{},regex:{}};this.validation_msgs={};this.has_messages=false;this.has_errors=false;this.button_list=[];this.user_button_list=[];this.has_file_inputs=false;}var Q="(?:^|\\s)(?:";var B=")(?:\\s|$)";var H="yiv-required";var I=/(?:^|\s+)yiv-length:\[([0-9]+)?,([1-9][0-9]*)?\](?:\s+|$)/;var R=/(?:^|\s+)yiv-integer(?::\[([-+]?[0-9]+)?,([-+]?[0-9]+)?\])?(?:\s+|$)/;var P=/(?:^|\s+)yiv-decimal(?::\[([-+]?(?:[0-9]+\.?|[0-9]+\.[0-9]+|\.[0-9]+))?,([-+]?(?:[0-9]+\.?|[0-9]+\.[0-9]+|\.[0-9]+))?\])?(?:\s+|$)/;O.integer_value_re=/^[-+]?[0-9]+$/;O.decimal_value_re=/^[-+]?(?:[0-9]+\.?|[0-9]*\.[0-9]+)$/;O.row_marker_class="formmgr-row";O.field_marker_class="formmgr-field";O.status_marker_class="formmgr-message-text";O.status_none_class="formmgr-status-hidden";O.status_success_class="formmgr-status-success";O.status_failure_class="formmgr-status-failure";O.row_status_prefix="formmgr-has";var C;var F;var G;function M(){if(!C){C=O.status_success_class+"|"+O.status_failure_class;}return C;}function L(){if(!F){F=O.row_status_prefix+"([^\\s]+)";}return F;}function A(){if(!G){G=new RegExp(Q+L()+B);}return G;}O.Strings={validation_error:"Correct errors in the highlighted fields before continuing.",required_string:"This field requires a value.",required_menu:"This field is required. Choose a value from the pull-down list.",length_too_short:"Enter text that is at least {min} characters or longer.",length_too_long:"Enter text that is up to {max} characters long.",length_out_of_range:"Enter text that is {min} to {max} characters long.",integer:"Enter a whole number (no decimal point).",integer_too_small:"Enter a number that is {min} or higher (no decimal point).",integer_too_large:"Enter a number that is {max} or lower (no decimal point).",integer_out_of_range:"Enter a number between or including {min} and {max} (no decimal point).",decimal:"Enter a number.",decimal_too_small:"Enter a number that is {min} or higher.",decimal_too_large:"Enter a number that is {max} or lower.",decimal_out_of_range:"Enter a number between or including {min} and {max}."};O.status_order=["error","warn","success","info"];O.getStatusPrecedence=function(T){for(var U=0;U<O.status_order.length;U++){if(T==O.status_order[U]){return U;}}return O.status_order.length;};O.statusTakesPrecendence=function(U,T){return(!U||O.getStatusPrecedence(T)<O.getStatusPrecedence(U));};O.getElementStatus=function(U){var T=D.one(U).get("className").match(A());return(T&&T.length>1?T[1]:false);};function K(T){if(D.Lang.isString(T)){return T.replace(/^#/,"");}else{if(T instanceof D.Node){return T.get("id");}else{return T.id;}}}function E(U,T){U=D.Node.getDOMNode(D.one(U));while(U&&!D.DOM.hasClass(U,T)){U=U.parentNode;if(!U||!U.tagName){return null;}}return D.one(U);}function N(T,U){T=D.Node.getDOMNode(D.one(T));U=U.toLowerCase();while(T&&T.tagName.toLowerCase()!=U){T=T.parentNode;if(!T||!T.tagName){return null;}}return D.one(T);}O.cleanValues=function(X){var W=false;for(var U=0;U<X.length;U++){var T=X[U];var V=T.type&&T.type.toLowerCase();if(V=="file"){W=true;}else{if(V=="select-multiple"){}else{if(T.value){T.value=D.Lang.trim(T.value);}}}}return W;};function J(T){return(!D.Lang.isUndefined(T)&&T.length>0);}O.validateFromCSSData=function(X,U){var Z=D.DOM.hasClass(X,H);if(Z&&X.value===""){var Y=null;if(U&&U.required){Y=U.required;}else{if(X.tagName.toLowerCase()=="select"){Y=O.Strings.required_menu;}else{Y=O.Strings.required_string;}}return{keepGoing:false,error:Y};}else{if(!Z&&X.value===""){return{keepGoing:false};}}if(X.className){var T=X.className.match(I);if(T&&T.length){if(J(T[1])&&J(T[2])&&parseInt(T[1],10)>parseInt(T[2],10)){}var Y=null;var V=(J(T[1])&&T[1]!=="0");if(V&&J(T[2])){Y=O.Strings.length_out_of_range;}else{if(V){Y=O.Strings.length_too_short;}else{if(J(T[2])){Y=O.Strings.length_too_long;}}}if(X.value&&J(T[1])&&X.value.length<parseInt(T[1],10)){if(U&&U.min_length){Y=U.min_length;}Y=D.substitute(Y,{min:parseInt(T[1],10),max:parseInt(T[2],10)});return{keepGoing:false,error:Y};}if(X.value&&J(T[2])&&X.value.length>parseInt(T[2],10)){if(U&&U.max_length){Y=U.max_length;}Y=D.substitute(Y,{min:parseInt(T[1],10),max:parseInt(T[2],10)});return{keepGoing:false,error:Y};}}var T=X.className.match(R);if(T&&T.length){if(J(T[1])&&J(T[2])&&parseInt(T[1],10)>parseInt(T[2],10)){}var W=parseInt(X.value,10);if(X.value&&(!O.integer_value_re.test(X.value)||(J(T[1])&&W<parseInt(T[1],10))||(J(T[2])&&W>parseInt(T[2],10)))){var Y=null;if(U&&U.integer){Y=U.integer;}else{if(J(T[1])&&J(T[2])){Y=O.Strings.integer_out_of_range;}else{if(J(T[1])){Y=O.Strings.integer_too_small;}else{if(J(T[2])){Y=O.Strings.integer_too_large;}else{Y=O.Strings.integer;}}}}Y=D.substitute(Y,{min:parseInt(T[1],10),max:parseInt(T[2],10)});return{keepGoing:false,error:Y};}}var T=X.className.match(P);if(T&&T.length){if(J(T[1])&&J(T[2])&&parseFloat(T[1])>parseFloat(T[2])){}var W=parseFloat(X.value);if(X.value&&(!O.decimal_value_re.test(X.value)||(J(T[1])&&W<parseFloat(T[1]))||(J(T[2])&&W>parseFloat(T[2])))){var Y=null;if(U&&U.decimal){Y=U.decimal;}else{if(J(T[1])&&J(T[2])){Y=O.Strings.decimal_out_of_range;}else{if(J(T[1])){Y=O.Strings.decimal_too_small;}else{if(J(T[2])){Y=O.Strings.decimal_too_large;}else{Y=O.Strings.decimal;}}}}Y=D.substitute(Y,{min:parseFloat(T[1],10),max:parseFloat(T[2],10)});return{keepGoing:false,error:Y};}}}return{keepGoing:true};};function S(){var X=(this.button_list.length===0);for(var W=0;W<this.form.elements.length;W++){var a=this.form.elements[W];var V=a.tagName.toLowerCase();var Y=(a.type?a.type.toLowerCase():null);if(X&&(Y=="submit"||Y=="reset"||V=="button")){this.button_list.push(a);}if(!a.name){continue;}var T=this.default_value_map[a.name];if(V=="input"&&Y=="file"){a.value="";}else{if(D.Lang.isUndefined(T)){if(V=="input"&&(Y=="password"||Y=="text")){this.default_value_map[a.name]=a.value;
}else{if(V=="input"&&Y=="checkbox"){this.default_value_map[a.name]=(a.checked?a.value:"");}else{if(V=="input"&&Y=="radio"){var Z=this.form[a.name];if(Z&&!Z.length){this.default_value_map[a.name]=Z.value;}else{if(Z){this.default_value_map[a.name]=Z[0].value;for(var U=0;U<Z.length;U++){if(Z[U].checked){this.default_value_map[a.name]=Z[U].value;break;}}}}}else{if((V=="select"&&Y=="select-one")||V=="textarea"){this.default_value_map[a.name]=a.value;}}}}}else{if(V=="input"&&(Y=="password"||Y=="text")){a.value=T;}else{if(V=="input"&&(Y=="checkbox"||Y=="radio")){a.checked=(a.value==T);}else{if(V=="select"&&Y=="select-one"){a.value=T;if(a.selectedIndex>=0&&a.options[a.selectedIndex].value!==T.toString()){a.selectedIndex=-1;}}else{if(V=="textarea"){a.value=T;}}}}}}}}O.prototype={getForm:function(){if(!this.form){this.form=D.config.doc.forms[this.form_name];}return this.form;},hasFileInputs:function(){return this.has_file_inputs;},setDefaultValues:function(T){this.default_value_map=T;},setDefaultValue:function(U,T){this.default_value_map[U]=T;},saveCurrentValuesAsDefault:function(){this.default_value_map={};this.button_list=[];S.call(this);},setFunction:function(U,T){this.validation.fn[K(U)]=T;},setRegex:function(V,U,T){V=K(V);if(D.Lang.isString(U)){this.validation.regex[V]=new RegExp(U,T);}else{this.validation.regex[V]=U;}if(!this.validation_msgs[V]||!this.validation_msgs[V].regex){}},setErrorMessages:function(U,T){this.validation_msgs[K(U)]=T;},addErrorMessage:function(V,T,U){V=K(V);if(!this.validation_msgs[V]){this.validation_msgs[V]={};}this.validation_msgs[V][T]=U;},clearForm:function(){this.clearMessages();this.form.reset();this.postPopulateForm();},populateForm:function(){if(!this.default_value_map){this.default_value_map={};}this.clearMessages();S.call(this);this.postPopulateForm();},postPopulateForm:function(){},isChanged:function(){for(var V=0;V<this.form.elements.length;V++){var Y=this.form.elements[V];if(!Y.name){continue;}var W=(Y.type?Y.type.toLowerCase():null);var U=Y.tagName.toLowerCase();var T=this.default_value_map[Y.name];if(T===null||typeof T==="undefined"){T="";}if(U=="input"&&W=="file"){if(Y.value){return true;}}else{if(U=="input"&&(W=="password"||W=="text"||W=="file")){if(Y.value!=T){return true;}}else{if(U=="input"&&(W=="checkbox"||W=="radio")){var X=(Y.value==T);if((X&&!Y.checked)||(!X&&Y.checked)){return true;}}else{if((U=="select"&&W=="select-one")||U=="textarea"){if(Y.value!=T){return true;}}}}}}return false;},prepareForm:function(){this.getForm();if(!this.prePrepareForm.apply(this,arguments)){return false;}this.populateForm();return this.postPrepareForm.apply(this,arguments);},prePrepareForm:function(){return true;},postPrepareForm:function(){return true;},initFocus:function(){for(var V=0;V<this.form.elements.length;V++){var X=this.form.elements[V];if(X.disabled||X.offsetHeight===0){continue;}var T=X.tagName.toLowerCase();var W=(X.type?X.type.toLowerCase():null);if((T=="input"&&(W=="file"||W=="password"||W=="text"))||T=="textarea"){try{X.focus();}catch(U){}X.select();break;}}},validateForm:function(){this.clearMessages();var U=true;var Z=this.form.elements;this.has_file_inputs=O.cleanValues(Z);for(var V=0;V<Z.length;V++){var a=Z[V].id;var T=this.validation_msgs[a];var Y=O.validateFromCSSData(Z[V],T);if(Y.error){this.displayMessage(Z[V],Y.error,"error");U=false;continue;}if(Y.keepGoing){if(this.validation.regex[a]&&!this.validation.regex[a].test(Z[V].value)){this.displayMessage(Z[V],T?T.regex:null,"error");U=false;continue;}}var X=this.validation.fn[a];var W=this;if(D.Lang.isFunction(X)){}else{if(D.Lang.isString(X)){X=W[X];}else{if(X&&X.scope){W=X.scope;X=(D.Lang.isString(X.fn)?W[X.fn]:X.fn);}else{X=null;}}}if(X&&!X.call(W,this.form,D.one(Z[V]))){U=false;continue;}}if(!this.postValidateForm(this.form)){U=false;}if(!U){this.notifyErrors();}return U;},postValidateForm:function(T){return true;},registerButton:function(T){var U={e:D.one(T)};this.user_button_list.push(U);},isFormEnabled:function(){return this.enabled;},enableForm:function(){this.setFormEnabled(true);},disableForm:function(){this.setFormEnabled(false);},setFormEnabled:function(T){this.enabled=T;var V=!T;for(var U=0;U<this.button_list.length;U++){this.button_list[U].disabled=V;}for(U=0;U<this.user_button_list.length;U++){var W=this.user_button_list[U];W.e.set("disabled",V);}},hasMessages:function(){return this.has_messages;},hasErrors:function(){return this.has_errors;},getRowStatus:function(U){var T=E(U,O.row_marker_class);return O.getElementStatus(T);},clearMessages:function(){this.has_messages=false;this.has_errors=false;if(this.status_node){this.status_node.set("innerHTML","");this.status_node.replaceClass(M(),O.status_none_class);}for(var U=0;U<this.form.elements.length;U++){var X=this.form.elements[U];var T=X.tagName.toLowerCase();var V=(X.type?X.type.toLowerCase():null);if(T=="button"||V=="submit"||V=="reset"){continue;}var W=E(X,O.row_marker_class);if(W&&W.hasClass(L())){W.all("."+O.status_marker_class).set("innerHTML","");W.removeClass(L());W.all("."+O.field_marker_class).removeClass(L());}}D.one(this.form).all("fieldset").removeClass(L());},displayMessage:function(X,U,Z,a){if(D.Lang.isUndefined(a)){a=true;}X=D.one(X);var T=E(X,O.row_marker_class);if(T&&O.statusTakesPrecendence(O.getElementStatus(T),Z)){var W=T.all("."+O.field_marker_class);if(W){W.removeClass(L());}if(U){T.one("."+O.status_marker_class).set("innerHTML",U);}var V=O.row_status_prefix+Z;T.replaceClass(L(),V);W=E(X,O.field_marker_class);if(W){W.replaceClass(L(),V);}var b=N(X,"fieldset");if(b&&O.statusTakesPrecendence(O.getElementStatus(b),Z)){b.removeClass(L());b.addClass(O.row_status_prefix+Z);}if(!this.has_messages&&a){T.scrollIntoView();try{X.focus();}catch(Y){}}this.has_messages=true;if(Z=="error"){this.has_errors=true;}return true;}return false;},notifyErrors:function(){this.displayFormMessage(O.Strings.validation_error,true,false);},displayFormMessage:function(V,U,T){if(D.Lang.isUndefined(T)){T=true;}if(this.status_node){if(!this.status_node.innerHTML){this.status_node.replaceClass(O.status_none_class,(U?O.status_failure_class:O.status_success_class));
this.status_node.set("innerHTML",V);}if(T){this.status_node.scrollIntoView();}}else{}}};D.FormManager=O;},"@VERSION@",{requires:["node-base","substitute"]});