import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;
import java.util.List;
import java.util.ArrayList;

public class FileUtil {
    public static List<String> getLinesFromFile (String path) {
        ArrayList<String> dataList = new ArrayList<String>();
        try {
            File myObj = new File(path);
            Scanner myReader = new Scanner(myObj);
            while (myReader.hasNextLine()) {
                String data = myReader.nextLine();
                dataList.add(data);
//                System.out.println(data);
            }
            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
        return dataList;
    }

    public static void writeLines (List<String> lines) {
        try {
            FileWriter myWriter = new FileWriter("filtered.txt");
            for(String  line : lines) {
                myWriter.write(line);
            }
            myWriter.close();
            System.out.println("Successfully wrote to the file.");
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }
}
