
const useGenre = (selectedgenres) => {
 
      if(selectedgenres.length < 1 ){
        return "";
      }
      const values = selectedgenres.map((x) => x.id);

      return values.reduce((acc ,curr) => acc+','+curr);
   
};

export default useGenre;
