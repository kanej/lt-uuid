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
lt.plugins.uuid.cryto_buffer = (function cryto_buffer(n){var buf = (new Uint16Array(n));var filled_buf = window.crypto.getRandomValues(buf);return cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.map.call(null,(function (p1__8198_SHARP_){return (filled_buf[p1__8198_SHARP_]);
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
lt.plugins.uuid.get_editor = (function get_editor(){return lt.objs.editor.__GT_cm_ed.call(null,lt.objs.editor.pool.last_active.call(null));
});
lt.plugins.uuid.insert_uuid = (function insert_uuid(){var temp__4092__auto__ = lt.plugins.uuid.get_editor.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;if(cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,ed)))
{return lt.objs.editor.replace_selection.call(null,ed,lt.plugins.uuid.generate_uuid.call(null));
} else
{return lt.objs.editor.insert_at_cursor.call(null,ed,lt.plugins.uuid.generate_uuid.call(null));
}
} else
{return null;
}
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"uuid.insert","uuid.insert",2371604414),new cljs.core.Keyword(null,"desc","desc",1016984067),"UUID: Insert UUID",new cljs.core.Keyword(null,"exec","exec",1017031683),lt.plugins.uuid.insert_uuid], null));
}

//# sourceMappingURL=uuid_compiled.js.map