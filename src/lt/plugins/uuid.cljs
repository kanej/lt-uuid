(ns lt.plugins.uuid
  (:require [lt.objs.popup :as popup]
            [lt.objs.command :as cmd]

            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool])
  (:require-macros [lt.macros :refer [behavior]]))

(defn cryto-buffer []
  (let [buf (js/Uint16Array. 8)]
    (. js/window.crypto getRandomValues buf)))

(defn generate-uuid []
  (let [rb (cryto-buffer)
        rand-chunks (map #(.toString (aget rb %) 16) (range 8))
        some-other-chunks [nil \- \- \- \- nil nil nil]]
    (->> (interleave rand-chunks some-other-chunks)
         (remove nil?)
         (apply str))))

;; (generate-uuid)

;; (.replace "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx" #"[xy]" (fn [c] "q"))

(defn get-editor []
  (editor/->cm-ed (pool/last-active)))

(defn insert-uuid []
  (lt.objs.editor/insert-at-cursor (get-editor) (generate-uuid)))

(cmd/command {:command :insert-uuid
              :desc "UUID: Insert UUID at cursor."
              :exec insert-uuid})
