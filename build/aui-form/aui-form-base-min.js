AUI.add("aui-form-base",function(B){var H=B.Lang,D=B.ClassNameManager.getClassName,I="form",F=D(I),C=D("field","labels"),G=D("field","labels","inline");CSS_LABEL_ALIGN={left:[C,"left"].join("-"),right:[C,"right"].join("-"),top:[C,"top"].join("-")};var E=B.Component.create({NAME:I,ATTRS:{action:{value:location.href,getter:"_attributeGetter",setter:"_attributeSetter"},id:{},method:{value:"POST",getter:"_attributeGetter",setter:"_attributeSetter"},monitorChanges:{value:false},nativeSubmit:{value:false},values:{getter:function(K){var A=this;var J=B.io._serialize(A.get("contentBox").getDOM());return B.QueryString.parse(J);},setter:function(L){var A=this;var J=A._setFieldsObject;var K=A.get("monitorChanges");if(H.isArray(L)){J=A._setFieldsArray;}B.each(L,B.rbind(J,A,K));return B.Attribute.INVALID_VALUE;}},fieldValues:{getter:function(J){var A=this;var K={};A.fields.each(function(M,L,N){K[M.get("name")]=M.get("value");});return K;}},labelAlign:{value:""}},HTML_PARSER:{action:function(J){var A=this;return A._attributeGetter(null,"action");},method:function(J){var A=this;return A._attributeGetter(null,"method");}},prototype:{CONTENT_TEMPLATE:"<form></form>",initializer:function(){var A=this;A.fields=new B.DataSet({getKey:A._getNodeId});},renderUI:function(){var A=this;A._renderForm();},bindUI:function(){var A=this;var J=A.get("nativeSubmit");if(!J){A.get("contentBox").on("submit",A._onSubmit);}A.after("disabledChange",A._afterDisabledChange);A.after("labelAlignChange",A._afterLabelAlignChange);A.after("nativeSubmitChange",A._afterNativeSubmitChange);},syncUI:function(){var A=this;var J=A.get("contentBox");A.set("id",J.guid());A._uiSetLabelAlign(A.get("labelAlign"));},add:function(M,A){var R=this;var N=B.Array(M);var J=N.length;var P;var M=R.fields;var O=R.get("contentBox");for(var L=0;L<N.length;L++){P=N[L];P=B.Field.getField(P);if(P&&M.indexOf(P)==-1){M.add(P);if(A&&!P.get("rendered")){var K=P.get("node");var Q=null;if(!K.inDoc()){Q=O;}P.render(Q);}}}},clearInvalid:function(){var A=this;A.fields.each(function(K,J,L){K.clearInvalid();});},getField:function(L){var J=this;var K;if(L){var A=J.fields;K=A.item(L);if(!H.isObject(K)){A.each(function(N,M,O){if(N.get("id")==L||N.get("name")==L){K=N;return false;}});}}return K;},invoke:function(K,J){var A=this;return A.fields.invoke(K,J);},isDirty:function(){var A=this;var J=false;A.fields.each(function(L,K,M){if(L.isDirty()){J=true;return false;}});return J;},isValid:function(){var A=this;var J=true;A.fields.each(function(L,K,M){if(!L.isValid()){J=false;return false;}});return J;},markInvalid:function(K){var A=this;var J=A._markInvalidObject;if(H.isArray(K)){J=A._markInvalidArray;}B.each(K,J,A);return A;},remove:function(K,J){var A=this;A.fields.remove(K);if(J){K=A.getField(K);if(K){K.destroy();}}return A;},resetValues:function(){var A=this;A.fields.each(function(K,J,L){K.resetValue();});},submit:function(J){var A=this;var K=A.isValid();if(K){if(A.get("nativeSubmit")){A.get("contentBox").submit();}else{J=J||{};B.mix(J,{id:A.get("id")});B.io(A.get("action"),{form:J,method:A.get("method"),on:{complete:B.bind(A._onSubmitComplete,A),end:B.bind(A._onSubmitEnd,A),failure:B.bind(A._onSubmitFailure,A),start:B.bind(A._onSubmitStart,A),success:B.bind(A._onSubmitSuccess,A)}});}}return K;},_afterDisabledChange:function(J){var A=this;var K="disable";if(J.newVal){K="enable";}A.fields.each(function(M,L,N){M[K];});},_afterLabelAlignChange:function(J){var A=this;A._uiSetLabelAlign(J.newVal,J.prevVal);},_afterNativeSubmitChange:function(K){var A=this;var J=A.get("contentBox");var L="on";if(K.newVal){L="detach";}J[L]("submit",A._onSubmit);},_attributeGetter:function(K,J){var A=this;return A.get("contentBox").attr(J);},_attributeSetter:function(K,J){var A=this;A.get("contentBox").attr(J,K);return K;},_getNodeId:function(K){var J;if(K instanceof B.Field){J=K.get("node");}else{J=B.one(K);}var A=J&&J.guid();return A;},_onSubmit:function(A){A.halt();},_onSubmitComplete:function(J){var A=this;A.fire("complete",{ioEvent:J});},_onSubmitEnd:function(J){var A=this;A.fire("end",{ioEvent:J});},_onSubmitFailure:function(J){var A=this;A.fire("failure",{ioEvent:J});},_onSubmitStart:function(J){var A=this;A.fire("start",{ioEvent:J});},_onSubmitSuccess:function(J){var A=this;A.fire("success",{ioEvent:J});},_renderForm:function(){var A=this;A.get("contentBox").removeClass(F);},_markInvalidArray:function(K,J,M){var A=this;var L=A.getField(K.id);if(L){L.markInvalid(K.message);}},_markInvalidObject:function(K,J,M){var A=this;var L=(!H.isFunction(K))&&A.getField(J);if(L){L.markInvalid(K);}},_setFieldsArray:function(L,K,N,J){var A=this;var M=A.getField(L.id);if(M){M.set("value",L.value);if(J){M.set("prevVal",M.get("value"));}}},_setFieldsObject:function(L,K,N,J){var A=this;var M=(!H.isFunction(L))&&A.getField(K);if(M){M.set("value",L);if(J){M.set("prevVal",M.get("value"));}}},_uiSetLabelAlign:function(K,M){var A=this;var J=A.get("contentBox");J.replaceClass(CSS_LABEL_ALIGN[M],CSS_LABEL_ALIGN[K]);var L="removeClass";if(/right|left/.test(K)){L="addClass";}J[L](G);}}});B.Form=E;},"@VERSION@",{requires:["aui-base","aui-data-set","aui-form-field","querystring-parse"]});