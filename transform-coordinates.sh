#! /bin/bash

convertFiles() {
    # for file in /Volumes/NejcsVault/Dragonhack2020/DMV0125/*; do
        # echo "${file##*/}"
    # done

    i=1;
    for thefile in /Volumes/NejcsVault/Dragonhack2020/DMV0125/*; do
    
        if [ -f "$thefile" ]; then
            echo "Converting ${thefile##*/} - $i"
            
            ./gk-slo -t 1 -hc "$thefile" -o "/Volumes/NejcsVault/Dragonhack2020/converted/CONVERTED_${thefile##*/}.txt"
            cat "/Volumes/NejcsVault/Dragonhack2020/converted/CONVERTED_${thefile##*/}.txt" >> "/Volumes/NejcsVault/Dragonhack2020/converted/ALL_CONVERTED.txt"
            i=$(($i+1))
            # if [[ $i -gt 5 ]]; then
                # break;
            # fi
        else
            echo "wrong"
        fi
    done
}

inputDirectory=$1
outputDirectory=$2

if [[ -d $inputDirectory && -d $outputDirectory ]]; then
    echo "Input directory: $inputDirectory output directory: $outputDirectory"
    echo "Starting"
    convertFiles $inputDirectory
    exit 0;
else
    echo "Input or output directory missing"
    exit 1;
fi

exit 0