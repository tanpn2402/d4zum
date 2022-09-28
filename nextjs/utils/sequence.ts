export default class SequenceManager {
  private req: number = 1
  private static instance: SequenceManager

  public static getSeq(): number {
    if (!SequenceManager.instance) {
      SequenceManager.instance = new SequenceManager();
    }
    return this.instance.req++
  }
}