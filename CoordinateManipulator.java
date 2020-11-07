import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

// 07.11.2020, David Zagoršek - java CoordinatesManipulator coordinates.txt 45.978571 14.395671 46.140379 14.627671
class CoordinatesManipulator {
    public static void main(String[] args) {
        if (args.length != 0 && args[0] != null && args[0] != "") {
            Coordinate areaBottomLeft = new Coordinate(Double.parseDouble(args[1]), Double.parseDouble(args[2]));
            Coordinate areaTopRight = new Coordinate(Double.parseDouble(args[3]), Double.parseDouble(args[4]));
            try {
                FileWriter myWriter = new FileWriter("filtered.txt");
                File myObj = new File(args[0]);
                Scanner myReader = new Scanner(myObj);
                while (myReader.hasNextLine()) {
                    String data = myReader.nextLine();
                    String[] dataInLine = data.split(" ");
                    Coordinate coordinate = new Coordinate(Double.parseDouble(dataInLine[0]), Double.parseDouble(dataInLine[1]));
                    if (coordinate.isInArea(areaBottomLeft, areaTopRight)) {
                        myWriter.write(data+"\n");
                    }
                }
                myReader.close();
                myWriter.close();
            } catch (FileNotFoundException e) {
                System.out.println("An error occurred.");
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

//      if (args.length != 0 && args[0] != null && args[0] != "") {
//           List<String> dataList = new ArrayList<>();
//           dataList = FileUtil.getLinesFromFile(args[0]);
//      }
//        if (args.length == 5) {
//            List<String> coordinatesInArea = coordinatesInArea(args, dataList);
//            FileUtil.writeLines(coordinatesInArea);
//            System.out.println("[CoordinatesManipulator @ main] wrote line");
//        }
    }

    public static List<String> coordinatesInArea (String [] arguments, List<String> dataList) {
        System.out.println("[CoordinatesManipulator @ coordinatesInArea] starting");
        List<String> boundingCoordinates = new ArrayList<>();
        Coordinate areaBottomLeft = new Coordinate(Double.parseDouble(arguments[1]), Double.parseDouble(arguments[2]));
        Coordinate areaTopRight = new Coordinate(Double.parseDouble(arguments[3]), Double.parseDouble(arguments[4]));
        for (String line : dataList) {
            String[] dataInLine = line.split(" ");
            if (dataInLine.length == 3) {
                Coordinate coordinate = new Coordinate(Double.parseDouble(dataInLine[0]), Double.parseDouble(dataInLine[1]));
                if (coordinate.isInArea(areaBottomLeft, areaTopRight)) {
                    boundingCoordinates.add(line);
                }
            }
        }
        System.out.println("[CoordinatesManipulator @ coordinatesInArea] end");
        return boundingCoordinates;
    }

    public static class Coordinate {
        public double x;
        public double y;

        Coordinate (double x, double y) {
            this.x = x;
            this.y = y;
        }

        /**
         * @author David Zagoršek
         * @date 07.11.2020
         * @description Check if current coordinate is in rectangular area between two points.
         * For example check if point is between (10,5) and (15,90).
         */
        public boolean isInArea (Coordinate areaBottomLeft, Coordinate areaTopRight) {
            return this.x >= areaBottomLeft.x && this.x <= areaTopRight.x && this.y >= areaBottomLeft.y && this.y <= areaTopRight.y;
        }
    }
}