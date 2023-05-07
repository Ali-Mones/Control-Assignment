package Graph;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class SFGSolver {
    private final List <List < Pair > > adj;
    private List< List < Integer > > forwardPaths = new ArrayList<>();
    private List< Integer > forwardPathsGains = new ArrayList<>();
    private List< List < Integer > > loops = new ArrayList<>();
    private List < Integer > loopGains = new ArrayList<>();
    private final List < Integer > delta = new ArrayList<>();
    private double numerator;
    private double Delta;
    private double result;

    public SFGSolver(List < List < Pair > > adj){
        this.adj = adj;
        PLAY();
    }

    private void PLAY(){
        computeAllForwardPaths();
        computeLoops();
        Delta = getDelta(loops);
        computeDeltaArray();
        result = computeResult();
    }

    private boolean checkNonTouching(List < List < Integer > > paths){
        HashMap < Integer , Integer > map = new HashMap<>();
        for(var path : paths){
            for (var i : path){
                if(map.containsKey(i)){
                    map.put(i , map.get(i) + 1);
                }else{
                    map.put(i , 1);
                }
            }
        }
        for (var keyValue : map.entrySet()){
            if(keyValue.getValue() > 1) return false;
        }
        return true;
    }

    private int getPathGain(List < Integer > path){
        int g = 1;
        for (int i = 0 ; i + 1 < path.size() ; ++i){
            for (var pair : adj.get(path.get(i))){
                if(((Integer) pair.F).equals(path.get(i + 1))){
                    g *= pair.S;
                    break;
                }
            }
        }
        return g;
    }

    private void computeAllForwardPaths(){
        boolean[] visited = new boolean[adj.size()];
        List<Integer> currentPath = new ArrayList<>();
        currentPath.add(1);
        int n = adj.size() - 1;
        forwardPathsDFS(1 , n , visited , currentPath);
        for (var path : forwardPaths){
            forwardPathsGains.add(getPathGain(path));
        }
    }

    private void forwardPathsDFS(int src, int dist , boolean[] visited , List < Integer > currentPath){
        if (src == dist){
            List<Integer> addList = new ArrayList<>(currentPath);
            forwardPaths.add(addList);
            return;
        }
        visited[src] = true;
        for (Pair pair : adj.get(src)){
            if(!visited[pair.F]){
                currentPath.add(pair.F);
                forwardPathsDFS(pair.F , dist , visited , currentPath);
                currentPath.remove((Integer)pair.F);
            }
        }
        visited[src] = false;
    }

    private void computeLoops(){
        for (int i = 1 ; i < adj.size() ; i++){
            boolean[] visited = new boolean[adj.size()];
            for (int j = 1 ; j < i ; j++) visited[j] = true;
            List < Integer > loop = new ArrayList<>();
            loopDFS(i , i , visited , loop);
        }
        for(var loop : loops){
            loopGains.add(getPathGain(loop));
        }
    }

    private void loopDFS(int src , int start , boolean[] visited , List < Integer > loop){
        visited[src] = true;
        loop.add(src);
        for (var pair : adj.get(src)){
            if (!visited[pair.F]){
                loopDFS(pair.F , start , visited , loop);
            }else if(visited[pair.F] && pair.F == start){
                List < Integer > addList = new ArrayList<>(loop);
                addList.add(start);
                loops.add(addList);
            }
        }
        loop.remove(loop.size() - 1);
    }

    private int getDelta(List < List < Integer > > loops){
        int n = loops.size();
        int ret = 1;
        for (int msk = 1 ; msk < (1 << n) ; msk++){
            List < List < Integer > > sub = new ArrayList<>() , sub2 = new ArrayList<>();
            for (int j = 0 ; j < n ; j++){
                if(((1 << j) & msk) >= 1){
                    List < Integer > loop = new ArrayList<>();
                    sub.add(loop);
                    sub2.add(loops.get(j));
                }
            }
            boolean check = checkNonTouching(sub);
            if (!check) continue;
            int g = 1;
            for (var path : sub2) g *= getPathGain(path);
            if ((Integer.bitCount(msk) & 1) == 1) ret -= g;
            else ret += g;
        }
        return ret;
    }

    private void computeDeltaArray(){
        for (var path : forwardPaths){
            List < List < Integer > > nonTouching = new ArrayList<>();
            for (var loop : loops){
                List < List < Integer > > list = new ArrayList<>();
                list.add(path);
                list.add(loop);
                if(checkNonTouching(list)) nonTouching.add(loop);
            }
            delta.add(getDelta(nonTouching));
        }
    }

    private double computeResult(){
        double x = 0;
        for (int i = 0 ; i < forwardPathsGains.size() ; i++){
            x += (double) forwardPathsGains.get(i) * delta.get(i);
        }
        setNumerator(x);
        return x / Delta;
    }

    public List < List < Integer > > getForwardPaths() {
        return forwardPaths;
    }

    public void setForwardPaths(List < List < Integer > > forwardPaths) {
        this.forwardPaths = forwardPaths;
    }
    
    public List < Integer > getForwardPathsGains() {
        return forwardPathsGains;
    }

    public void setForwardPathsGains(List < Integer > forwardPathsGains) {
        this.forwardPathsGains = forwardPathsGains;
    }

    public List < List < Integer > > getLoops() {
        return loops;
    }

    public void setLoops(List < List < Integer > > loops) {
        this.loops = loops;
    }

    public List<Integer> getLoopGains() {
        return loopGains;
    }

    public void setLoopGains(List<Integer> loopGains) {
        this.loopGains = loopGains;
    }

    public double getDelta() {
        return Delta;
    }

    public void setDelta(double delta) {
        Delta = delta;
    }

    public double getNumerator() {
        return numerator;
    }

    public void setNumerator(double numerator) {
        this.numerator = numerator;
    }

    public double getResult() {
        return result;
    }

    public void setResult(double result) {
        this.result = result;
    }

    public List < Integer > getDeltaArray(){
        return delta;
    }
}
