package Graph;

import java.util.Vector;

public class RouthSolver {

    final static float EPSILION = (float) 0.000000000001;
    static public int[] cofficientsExtractor(String[] TermsArray) {

        int sPos = TermsArray[0].indexOf("s");
        int sz = Integer.parseInt(TermsArray[0].substring(sPos+1));
        int Coefficients [] = new int[sz+1];

        for (String eq : TermsArray) {
            int coeff = 0;
            int j=0;
            int powerOfTerm = 0;

            if(eq.indexOf("s") == -1) {
                Coefficients[sz] = Integer.parseInt(eq);
                continue;
            }

            for(j=eq.length()-1;j>=0;j--){
                if(Character.isAlphabetic(eq.charAt(j))){
                    break;
                }
            }


            String subeq = eq.substring(0, j);
            String powString = eq.substring(j+1);
            if(powString == "") powerOfTerm = sz - 1;
            else powerOfTerm = sz - Integer.parseInt(powString);

            if (subeq.equals(""))
                coeff = 1;
            else if (subeq.equals("-"))
                coeff = -1;
            else
                coeff = Integer.parseInt(subeq);

            Coefficients[powerOfTerm] = coeff;
        }

        return Coefficients;
    }

    static public String[] splitEquations(String equation ){
        Vector<String> subEquations = new Vector<String>();
        equation = equation.replaceAll("\\^","");

        String subEquation = "";

        int i = 0;
        while (i < equation.length()) {
            if ((equation.charAt(i) == '-' || equation.charAt(i) == '+') && i != 0) {
                subEquations.add(subEquation);
                subEquation = "";
            }

            if (equation.charAt(i) != '+')
                subEquation += equation.charAt(i);
            i++;
        }

        subEquations.add(subEquation);

        String[] x = new String[subEquations.size()];
        for (int j = 0; j < subEquations.size(); j++) {
            x[j] = subEquations.elementAt(j);
        }
        return x;
    }

    static public int getPolesCount(int COFF[]){
        int sz = (int)Math.ceil((double)COFF.length/2);

        float RouthsArray[][] = new float[COFF.length][sz];

        int c=0,k=0;
        for(int i=0;i<COFF.length;i++){
            if(i%2 == 0){
                RouthsArray[0][c] = COFF[i];
                c++;
            } else{
                RouthsArray[1][k] = COFF[i];
                k++;
            }
        }

        for(int i=2;i<COFF.length;i++){
            for(int j=0;j<sz;j++){
                if(j+1 < sz && RouthsArray[i-1][0]!=0)
                    RouthsArray[i][j] = ((RouthsArray[i-1][0]*RouthsArray[i-2][j+1])-(RouthsArray[i-2][0]*RouthsArray[i-1][j+1]))/RouthsArray[i-1][0];
            }

            int cnt = 0;
            for(int j=0;j<sz;j++)
                if(RouthsArray[i][j] == 0)cnt++;

            if(cnt == sz){
                int power = COFF.length - i;
                for(int j=0;j<sz;j++) {
                    RouthsArray[i][j] = RouthsArray[i-1][j] * power;
                    power-=2;
                    if(power < 0)power = 0;
                }
            }else{
                if(RouthsArray[i][0] == 0)
                    RouthsArray[i][0] = EPSILION;
            }
        }

        for(int i=0;i<COFF.length;i++) {
            for (int j = 0; j < sz; j++) {
                System.out.print(RouthsArray[i][j] + "    ");
            }
            System.out.println();
        }

        int numOfPoles = 0;
        for(int i=0;i<COFF.length-1;i++){
            int signi = (int)Math.signum(RouthsArray[i][0]) == 0 ? 1: (int)Math.signum(RouthsArray[i][0]);
            int signaft = (int)Math.signum(RouthsArray[i+1][0]) == 0 ? 1: (int)Math.signum(RouthsArray[i+1][0]);

            if(signi != signaft)numOfPoles++;
        }

        return numOfPoles;
    }
}

