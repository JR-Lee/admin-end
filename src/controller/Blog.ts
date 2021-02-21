import { AppContext } from "src/types"

class Blog {
  static get(ctx: AppContext) {
    ctx.success([
      {
        id: '001a00c2acaacpdd',
        name: '浅谈 javascript 常用 16 种设计模式',
        author: '著名前端菜鸡',
        create_time: +new Date(),
        modify_time: 1024364721321
      }
    ])
  }

  static save() {
    return true
  }

  static update() {
    return true
  }
}

export default Blog
