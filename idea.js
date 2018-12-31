class Ideas {
  constructor(id, title, body, quality) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = quality || 0;
  }

  saveToStorage() {
    localStorage.setItem(this.id, JSON.stringify(this));
  }

  deleteFromStorage() {
    localStorage.removeItem(this.id);
  }

  updateContent() {
    
  }

  updateQuality(vote) {
    if(vote === "up" && this.quality < 2) {
      this.quality++;
    } else if(vote === "down" && this.quality > 0) {
      this.quality--;
    }
  }
}