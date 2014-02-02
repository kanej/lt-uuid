if(!lt.util.load.provided_QMARK_('lt.plugins.uuid')) {
goog.provide('lt.plugins.uuid');
goog.require('cljs.core');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor');
goog.require('lt.objs.editor');
goog.require('lt.objs.command');
goog.require('lt.objs.command');
goog.require('lt.objs.popup');
goog.require('lt.objs.popup');
lt.plugins.uuid.pad = (function pad(text_input){var text = text_input;var text__$1 = cljs.core.reverse.call(null,text);var text__$2 = cljs.core.concat.call(null,text__$1,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, ["0","0","0","0"], null));var text__$3 = cljs.core.take.call(null,4,text__$2);var text__$4 = cljs.core.reverse.call(null,text__$3);return cljs.core.apply.call(null,cljs.core.str,text__$4);
});
lt.plugins.uuid.cryto_buffer = (function cryto_buffer(n){var buf = (new Uint16Array(n));var filled_buf = window.crypto.getRandomValues(buf);return cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.map.call(null,(function (p1__8248_SHARP_){return (filled_buf[p1__8248_SHARP_]);
}),cljs.core.range.call(null,n)));
});
lt.plugins.uuid.y_values = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, ["8","9","a","b"], null);
lt.plugins.uuid.generate_y = (function generate_y(){return lt.plugins.uuid.y_values.call(null,cljs.core.rem.call(null,cljs.core.first.call(null,lt.plugins.uuid.cryto_buffer.call(null,1)),4));
});
lt.plugins.uuid.num_chunk__GT_hex_chunk = (function num_chunk__GT_hex_chunk(num_chunk){return lt.plugins.uuid.pad.call(null,num_chunk.toString(16));
});
lt.plugins.uuid.replace_at = (function replace_at(index,replace_char,input_str){var arr = cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,input_str);var arr__$1 = cljs.core.assoc.call(null,arr,index,replace_char);return cljs.core.apply.call(null,cljs.core.str,arr__$1);
});
lt.plugins.uuid.generate_uuid = (function generate_uuid(){var rb = lt.plugins.uuid.cryto_buffer.call(null,8);var rand_chunks = cljs.core.mapv.call(null,lt.plugins.uuid.num_chunk__GT_hex_chunk,rb);var some_other_chunks = new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,"-","-","-","-",null,null,null], null);return lt.plugins.uuid.replace_at.call(null,19,lt.plugins.uuid.generate_y.call(null),lt.plugins.uuid.replace_at.call(null,14,"4",cljs.core.apply.call(null,cljs.core.str,cljs.core.remove.call(null,cljs.core.nil_QMARK_,cljs.core.interleave.call(null,rand_chunks,some_other_chunks)))));
});
lt.plugins.uuid.format_uuid = (function format_uuid(uuid,p__8249){var map__8251 = p__8249;var map__8251__$1 = ((cljs.core.seq_QMARK_.call(null,map__8251))?cljs.core.apply.call(null,cljs.core.hash_map,map__8251):map__8251);var uuidBracketed = cljs.core.get.call(null,map__8251__$1,new cljs.core.Keyword(null,"uuidBracketed","uuidBracketed",1999196478));var uuidRemoveHyphens = cljs.core.get.call(null,map__8251__$1,new cljs.core.Keyword(null,"uuidRemoveHyphens","uuidRemoveHyphens",4573603796));var uuidUpperCase = cljs.core.get.call(null,map__8251__$1,new cljs.core.Keyword(null,"uuidUpperCase","uuidUpperCase",3316992233));var uuid__$1 = (cljs.core.truth_(uuidUpperCase)?uuid.toUpperCase():uuid);var uuid__$2 = (cljs.core.truth_(uuidRemoveHyphens)?clojure.string.replace.call(null,uuid__$1,"-",""):uuid__$1);var uuid__$3 = (cljs.core.truth_(uuidBracketed)?[cljs.core.str("{"),cljs.core.str(uuid__$2),cljs.core.str("}")].join(''):uuid__$2);return uuid__$3;
});
lt.plugins.uuid.get_editor = (function get_editor(){return lt.objs.editor.__GT_cm_ed.call(null,lt.objs.editor.pool.last_active.call(null));
});
lt.plugins.uuid.editor__GT_uuid_options = (function editor__GT_uuid_options(ed){return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"uuidUpperCase","uuidUpperCase",3316992233),ed.getOption("uuidUpperCase"),new cljs.core.Keyword(null,"uuidRemoveHyphens","uuidRemoveHyphens",4573603796),ed.getOption("uuidRemoveHyphens"),new cljs.core.Keyword(null,"uuidBracketed","uuidBracketed",1999196478),ed.getOption("uuidBracketed")], null);
});
lt.plugins.uuid.insert_uuid = (function insert_uuid(){var cm = lt.objs.editor.pool.last_active.call(null);var temp__4092__auto__ = lt.objs.editor.__GT_cm_ed.call(null,cm);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;var uuid = lt.plugins.uuid.format_uuid.call(null,lt.plugins.uuid.generate_uuid.call(null),lt.plugins.uuid.editor__GT_uuid_options.call(null,ed));if(cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,ed)))
{return lt.objs.editor.replace_selection.call(null,ed,uuid);
} else
{return lt.objs.editor.insert_at_cursor.call(null,ed,uuid);
}
} else
{return null;
}
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"uuid.insert","uuid.insert",2371604414),new cljs.core.Keyword(null,"desc","desc",1016984067),"UUID: Insert UUID",new cljs.core.Keyword(null,"exec","exec",1017031683),lt.plugins.uuid.insert_uuid], null));
lt.plugins.uuid.__BEH__set_uuid_options = (function __BEH__set_uuid_options(obj,upper_case_QMARK_,remove_hyphens_QMARK_,bracketed_QMARK_){return lt.objs.editor.set_options.call(null,obj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"uuidUpperCase","uuidUpperCase",3316992233),upper_case_QMARK_,new cljs.core.Keyword(null,"uuidRemoveHyphens","uuidRemoveHyphens",4573603796),remove_hyphens_QMARK_,new cljs.core.Keyword(null,"uuidBracketed","uuidBracketed",1999196478),bracketed_QMARK_], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.uuid","set-uuid-options","lt.plugins.uuid/set-uuid-options",3718652189),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.uuid.__BEH__set_uuid_options,new cljs.core.Keyword(null,"desc","desc",1016984067),"UUID: Set the options when inserting a UUID.",new cljs.core.Keyword(null,"params","params",4313443576),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Uppercase?",new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"boolean","boolean",1078615962)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Remove hyphens?",new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"boolean","boolean",1078615962)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Surround with brackets?",new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"boolean","boolean",1078615962)], null)], null),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",773332388),null], null), null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"user","user",1017503549),new cljs.core.Keyword(null,"exclusive","exclusive",2700522000),true);
}

//# sourceMappingURL=uuid_compiled.js.map