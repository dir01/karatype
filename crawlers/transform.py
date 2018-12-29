import json

with open("hebrew101.json") as f:
    data = json.loads(f.read())


def transform_word(word):
    return {
        "english": word["english"],
        "text": (word["original"] + " ") * 15,
        "description": "\n".join(
            map(
                lambda s: s.strip(),
                """
                <span class="romanization">{romanization}</span>
                <span class="gender">{gender}</span>
                <span class="hyphen">&mdash;</class>
                <span class="translation">{english}</span>
                <span class="class">{class}</span>
            """.format(
                    **word
                ).split(
                    "\n"
                ),
            )
        ),
    }


words = [item["word"] for item in data]
lines = [json.dumps(transform_word(w)) for w in words]
with open("foo.json", "wb+") as f:
    f.write(",\n".join(lines).encode("utf-8"))

