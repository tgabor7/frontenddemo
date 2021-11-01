import { useState } from "react"

/*
    Ez a hook a kezdeti adaok előállítására szolgál
*/

export default () => {
    const [embeddings, setEmbeddings] = useState<number[][]>([])
    const [loading, setLoading] = useState(false)

    
    const generate = (_seed: number, n_embeddings: number, embedding_length: number) => {
    
        var seed = _seed
        function random() {
            var x = Math.sin(seed++) * 10000;
            return ((Math.floor((x - Math.floor(x)) * 10.0) / 10.0) * 2.0) - 1.0;
        }

        let tmp_embeddings = []
        for (let i = 0; i < n_embeddings; i++) {
            let embedding = []
            for (let j = 0; j < embedding_length; j++) {
                embedding.push(Math.floor(random() * 10.0) / 10.0)
            }
            tmp_embeddings.push(embedding)
        }
        setEmbeddings(tmp_embeddings)
        return tmp_embeddings
    }

    return {
        loading,
        embeddings,
        generate
    }
}