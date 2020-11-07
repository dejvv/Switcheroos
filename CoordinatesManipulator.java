public class CoordinatesManipulator {
    public static void main(String[] args) {
        System.out.println("hello world");
        if (args[0] != null && args[0] != "") {
            FileUtil.getLinesFromFile(args[0]);
        }
    }
}