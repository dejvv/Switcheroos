LEFTUP= [313762.9999999999, 196757.1250000000]
RIGHTUP= [688942.1666666667,196757.1250000000]

LEFTDOWN =[313762.9999999999,23455.0416666666]
RIGHTDOWN=[ 688942.1666666667,23455.0416666666]

MIDUP_x = [(LEFTUP[0] + RIGHTUP[0])/2, LEFTUP[1]]
LEFTMID_y = [313762.9999999999, (LEFTDOWN[1] + LEFTUP[1])/2]
MIDDOWN_x = [(LEFTDOWN[0] + RIGHTDOWN[0])/2, LEFTDOWN[1]]
RIGHTMID_y = [688942.1666666667, (RIGHTDOWN[1] + RIGHTUP[1])/2]
MIDMID_x = [(LEFTDOWN[0] + RIGHTDOWN[0])/2, RIGHTMID_y[1]]
MIDUP = [MIDMID_x[0], RIGHTUP[1]]


print(MIDDOWN_x)



pic_1 = LEFTMID_y, MIDUP
string_cifra = str(LEFTMID_y[0])+","+str(LEFTMID_y[1])+","+str(MIDUP[0])+","+str(MIDUP[1])
link="http://gis.arso.gov.si/atlasokolja/gis/MapImage.ashx?mid=gis1&width=4096&height=4096&extent="+ string_cifra+ '&psid=1730337800&sessionid=c0a0wntxwnlh23hrhcpccw3y&preventCache=1604788529116'
print(link)
pic_2 = MIDMID_x, RIGHTUP
string_cifra = str(MIDMID_x[0])+","+str(MIDMID_x[1])+","+str(RIGHTUP[0])+","+str(RIGHTUP[1])
link="http://gis.arso.gov.si/atlasokolja/gis/MapImage.ashx?mid=gis1&width=4096&height=4096&extent="+ string_cifra+ '&psid=1730337800&sessionid=c0a0wntxwnlh23hrhcpccw3y&preventCache=1604788529116'
print(link)



pic_3 = LEFTDOWN, MIDMID_x
string_cifra = str(LEFTDOWN[0])+","+str(LEFTDOWN[1])+","+str(MIDMID_x[0])+","+str(MIDMID_x[1])
link="http://gis.arso.gov.si/atlasokolja/gis/MapImage.ashx?mid=gis1&width=4096&height=4096&extent="+ string_cifra+ '&psid=1730337800&sessionid=c0a0wntxwnlh23hrhcpccw3y&preventCache=1604788529116'
print(link)










pic_4 = MIDDOWN_x, RIGHTMID_y
string_cifra = str(MIDDOWN_x[0])+","+str(MIDDOWN_x[1])+","+str(RIGHTMID_y[0])+","+str(RIGHTMID_y[1])
link="http://gis.arso.gov.si/atlasokolja/gis/MapImage.ashx?mid=gis1&width=4096&height=4096&extent="+ string_cifra+ '&psid=1730337800&sessionid=c0a0wntxwnlh23hrhcpccw3y&preventCache=1604788529116'
print(link)







x_iter = (RIGHTDOWN[0] - LEFTDOWN[0]) / 8
y_iter = (LEFTUP[1] - LEFTDOWN[1]) / 8


# y0 = LEFTUP[1] - y_iter
listtt = []
for j in range(1,9):
    y0 = LEFTUP[1] - y_iter * j
    x0 = LEFTUP[0]

    for i in range(1,9):
        n1 = (x0, y0)
        x1 = x0 + x_iter
        x0 = LEFTUP[0] + x_iter * i
        y1 = y0 + y_iter
        n2 = (x1, y1)
        print("x0 y0", j, i, n1)
        print("x1 y1", j, i, n2)


        listtt.append((n1, n2))

    y0 = LEFTUP[1] - y_iter*j

print(listtt)
print(RIGHTDOWN[0] - LEFTDOWN[0])
print(y_iter)
print(x_iter)
# print(y_iter)


# x0 = LEFTUP[0]
# print(x0 + x_iter*8)

k=0
import requests
import urllib.request
for le, ru in listtt:
    x0, y0 = le
    x1, y1 = ru
    string_cifra = str(x0)+","+str(y0)+","+str(x1)+","+str(y1)
    link = "http://gis.arso.gov.si/atlasokolja/gis/MapImage.ashx?mid=gis1&width=4096&height=4096&extent=" + string_cifra + '&psid=1730337800&sessionid=c0a0wntxwnlh23hrhcpccw3y&preventCache=1604788529116'
    resource = urllib.request.urlopen(link)
    filename = "slo_part_"+str(k)+".jpg"
    k+=1
    print(filename)
    output = open(filename,"wb")
    output.write(resource.read())

    output.close()


