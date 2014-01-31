(ns lt.plugins.uuid
  (:require [lt.objs.popup :as popup]
            [lt.objs.command :as cmd]

            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool])
  (:require-macros [lt.macros :refer [behavior]]))

(defn pad [text-input]
  (let [text text-input
        text (reverse text)
        text (concat text [\0 \0 \0 \0])
        text (take 4 text)
        text (reverse text)]
    (apply str text)))

(defn cryto-buffer [n]
  (let [buf (js/Uint16Array. n)
        filled-buf (. js/window.crypto getRandomValues buf)]
    (into [] (map #(aget filled-buf %) (range n)))))

(def y-values [\8 \9 \a \b])

(defn generate-y []
  (-> (cryto-buffer 1)
      first
      (rem 4)
      y-values))

(defn num-chunk->hex-chunk [num-chunk]
  (-> (.toString num-chunk 16)
      pad))

(defn replace-at [index replace-char input-str]
  (let [arr (into [] input-str)
        arr (assoc arr index replace-char)]
    (apply str arr)))

(defn generate-uuid []
  (let [rb (cryto-buffer 8)
        rand-chunks (mapv num-chunk->hex-chunk rb)
        some-other-chunks [nil \- \- \- \- nil nil nil]]
    (->> (interleave rand-chunks some-other-chunks)
         (remove nil?)
         (apply str)
         (replace-at 14 \4)
         (replace-at 19 (generate-y)))))

(defn get-editor []
  (editor/->cm-ed (pool/last-active)))

(defn insert-uuid []
  (lt.objs.editor/insert-at-cursor (get-editor) (generate-uuid)))

(cmd/command {:command :insert-uuid
              :desc "UUID: Insert UUID at cursor."
              :exec insert-uuid})

;;(take 1 (filter #(not= 36 (count %)) (take 10000 (repeatedly generate-uuid))))

;;  (dotimes [n 100]
;;    (let [length (count (generate-uuid))]
;;      (when (not= 36 length)
;;        (.log js/console "Fail"))))

;;(generate-uuid)
;; (.replace "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx" #"[xy]" (fn [c] "q"))
