import scrapy


class Hebrew100Spider(scrapy.Spider):
    name = "hebrew100"

    start_urls = [
        "https://www.hebrewpod101.com/hebrew-word-lists/?page=%s" % p
        for p in range(1, 5)
    ]

    def parse(self, response):
        items = response.css(".js-wlv-item")
        return map(self.extract_item_info, items)

    def extract_item_info(self, item):
        return {
            "word": self.extract_box_info(item.css(".wlv-item__word-box")),
            "sample": self.extract_box_info(item.css(".wlv-item__samples-box")),
        }

    def extract_box_info(self, box):
        return {
            k: box.css(".{}::text".format(v)).extract_first()
            for k, v in {
                "original": "wlv-item__word",
                "class": "wlv-item__word-class",
                "gender": "wlv-item__word-gender",
                "romanization": "romanization",
                "english": "wlv-item__english",
            }.items()
        }
