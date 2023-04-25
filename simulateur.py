# Imports
import tkinter as tk
import tkinter.messagebox as msg
import random as rnd
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D   
import matplotlib.animation as animation
from matplotlib import style
import time

# Suppression des anciennes simulations
open("./data/simulated_consumption.csv", 'w+').close()
# Récupération des données réelles
file = open("./data/historic_consumption.csv", "r")
lignes = file.readlines()
file.close()
lignes = lignes[:-1]
n = len(lignes)
int_lignes = []
index = rnd.randint(0, n-1-rnd.randint(10, 15))
delai = 60 # Période affichée sur le graphique (en s)
State = "SAFE"

# Fonctions
def animate(i):
    global index
    global state
    
    # Simulation des nouvelles données chaque seconde
    if(rnd.randint(1, 20) == 1 or index >= n) :
        index = rnd.randint(0, n-1-rnd.randint(10, 15))
    file = open("./data/simulated_consumption.csv", "a")
    t = time.localtime()
    current_time = time.strftime("%H:%M:%S", t)
    if (State == "DDOS") :
        int_lignes.append(4*float(lignes[index].removesuffix("\n").replace(",", ".")))
        file.write(str(int_lignes[-1]).replace(".", ",").replace(",", ".") + "_" + current_time + "\n")
    else :
        file.write(lignes[index].removesuffix("\n").replace(",", ".") + "_" + current_time + "\n")
        int_lignes.append(float(lignes[index].removesuffix("\n").replace(",", ".")))
    index += 1
    file.close()
    
    # Mise à jour du graphique chaque seconde
    xar=[max([-delai, -len(int_lignes)])]
    yar=[]
    for value in int_lignes[max([-delai, -len(int_lignes)]):]:
        xar.append(xar[-1]+1)
        yar.append(value)
    line = Line2D(xar[:-1], yar)
    ax.clear()
    ax.add_line(line)
    ax.plot()
    return

def setSAFE() :
    global State
    State = "SAFE"

def setDDOS() :
    global State
    State = "DDOS"

def callback():
    if msg.askyesno('Quitter', 'Êtes-vous sûr de vouloir quitter ?') :
        fenetre.destroy()

def info() :
    msg.showinfo('A propos', "Simulateur réalisé dans le cadre d'un projet IoT. Il permet de simuler la consommation électrique d'un routeur face à une attaque de type DDOS.")

def alert():
    msg.showerror("Version alpha", "Action bientôt disponible !")

# Création de la fenêtre
fenetre = tk.Tk()
fenetre.title("Simulateur")

# Création des onglets menu
menubar = tk.Menu(fenetre)

menu1 = tk.Menu(menubar, tearoff=0)
menu1.add_command(label="Sauvegarder", command=alert)
menu1.add_separator()
menu1.add_command(label="Quitter", command=callback)
menubar.add_cascade(label="Fichier", menu=menu1)

menu2 = tk.Menu(menubar, tearoff=0)
menu2.add_command(label="Couper", command=alert)
menu2.add_command(label="Copier", command=alert)
menu2.add_command(label="Coller", command=alert)
menubar.add_cascade(label="Editer", menu=menu2)

menu3 = tk.Menu(menubar, tearoff=0)
menu3.add_command(label="A propos", command=info)
menubar.add_cascade(label="Aide", menu=menu3)

fenetre.config(menu=menubar)

# Frame du titre
Fram_Titre = tk.Frame(fenetre, borderwidth = 4, relief = 'groove')
tk.Label(Fram_Titre, text = "Simulateur de consommation de données").pack(padx = 100, pady = 10)
Fram_Titre.pack(padx = 25, pady = 25)

# Frame des paramètres
Fram_param = tk.LabelFrame(fenetre, text = "Choix de la nature des données", width = 450, height = 60)
state = tk.StringVar(master = Fram_param, value = "SAFE") # Elle permet juste d'avoir le premier radiobutton(SAFE) préselectionné
p = tk.PanedWindow(Fram_param, orient = 'horizontal')
p.add(tk.Radiobutton(p, text = "Saine", variable = state, value = "SAFE", command = setSAFE))
p.add(tk.Radiobutton(p, text = "Attack DDOS", variable = state, value = "DDOS", command = setDDOS))
p.pack(padx = 50, pady = 5)
Fram_param.pack(padx = 25, pady = 25)

# Frame du graphique
Fram_graph = tk.Frame(fenetre, width = 600, height = 480, background = 'blue')
Fram_graph.pack(padx = 50, pady = 25)

# Création du graphique
style.use('ggplot')
figure = plt.Figure()
ax = figure.add_subplot(111)
line, = ax.plot([], [])
canvas = FigureCanvasTkAgg(figure, master = Fram_graph)
canvas.get_tk_widget().grid(column=0,row=1)

# Button quitter
bouton = tk.Button(fenetre, text = "Quitter", command = callback)
bouton.pack(padx = 10, pady = 10)

# Activation du tracé du graph
ani = animation.FuncAnimation(figure, animate, interval = 1000)
# Activation de la fenêtre
fenetre.mainloop()