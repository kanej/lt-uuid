(ns lt.plugins.uuid
  (:require [lt.objs.popup :as popup]
            [lt.objs.command :as cmd]

            [lt.objs.editor :as editor]
            [lt.objs.editor.pool :as pool])
  (:require-macros [lt.macros :refer [behavior]]))

;; UUID Generation

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

(defn format-uuid [uuid {:keys [uuidUpperCase uuidRemoveHyphens uuidBracketed]}]
  (let [uuid (if uuidUpperCase (.toUpperCase uuid) uuid)
        uuid (if uuidRemoveHyphens (clojure.string/replace uuid "-" "") uuid)
        uuid (if uuidBracketed (str "{" uuid "}") uuid)]
    uuid))

;; Light Table commands and behaviors

(defn get-editor []
  (editor/->cm-ed (pool/last-active)))

(defn editor->uuid-options [ed]
  {:uuidUpperCase (.getOption ed "uuidUpperCase")
   :uuidRemoveHyphens (.getOption ed "uuidRemoveHyphens")
   :uuidBracketed (.getOption ed "uuidBracketed")})

(defn insert-uuid []
  (let [cm (pool/last-active)]
    (when-let [ed (editor/->cm-ed cm)]
      (let [uuid (format-uuid (generate-uuid) (editor->uuid-options ed))]
        (if (editor/selection? ed)
          (editor/replace-selection ed uuid)
          (lt.objs.editor/insert-at-cursor ed uuid))))))

(cmd/command {:command :uuid.insert
              :desc "UUID: Insert UUID"
              :exec insert-uuid})

(behavior ::set-uuid-options
          :triggers #{:object.instant}
          :type :user
          :exclusive true
          :desc "UUID: Set the options when inserting a UUID."
          :params [{:label "Uppercase?"
                    :type :boolean}
                   {:label "Remove hyphens?"
                    :type :boolean}
                   {:label "Surround with brackets?"
                    :type :boolean}]
          :reaction (fn [obj upper-case? remove-hyphens? bracketed?]
                      (editor/set-options obj {:uuidUpperCase upper-case?
                                               :uuidRemoveHyphens remove-hyphens?
                                               :uuidBracketed bracketed?})))

;;;; Some adhoc tests

;;(generate-uuid)

;; (defn run-crude-tests []
;;   (let [example-uuid "bb6535cf-5243-4a2b-bfbf-3c4db10cfc8c"
;;         test-assert (fn [number expected actual]
;;                       (when (not= expected actual)
;;                         (.log js/console (str "Failed:" number))))]

;;     ;; UUID generation
;;     (dotimes [n 1000]
;;       (let [uuid (generate-uuid)]
;;         (test-assert "length-test" 36 (count uuid))
;;         (test-assert "version-test" \4 (.charAt uuid 14))
;;         (test-assert "y-test" true (not (nil? (#{\a \b \8 \9} (.charAt uuid 19)))))))

;;     ;; UUID formatting
;;     (test-assert 1 example-uuid (format-uuid example-uuid nil))
;;     (test-assert 2 example-uuid (format-uuid example-uuid {:uuidUpperCase false :uuidRemoveHyphens false :uuidBracketed false}))
;;     (test-assert 3 "BB6535CF-5243-4A2B-BFBF-3C4DB10CFC8C" (format-uuid example-uuid {:uuidUpperCase true :uuidRemoveHyphens false :uuidBracketed false}))
;;     (test-assert 4 "bb6535cf52434a2bbfbf3c4db10cfc8c" (format-uuid example-uuid {:uuidUpperCase false :uuidRemoveHyphens true :uuidBracketed false}))
;;     (test-assert 5 "{bb6535cf-5243-4a2b-bfbf-3c4db10cfc8c}" (format-uuid example-uuid {:uuidUpperCase false :uuidRemoveHyphens false :uuidBracketed true}))
;;     (test-assert 6 "{BB6535CF52434A2BBFBF3C4DB10CFC8C}" (format-uuid example-uuid {:uuidUpperCase true :uuidRemoveHyphens true :uuidBracketed true}))))

;; (run-crude-tests)
