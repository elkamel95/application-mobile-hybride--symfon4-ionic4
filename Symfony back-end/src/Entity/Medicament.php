<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MedicamentRepository")
 */
class Medicament
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;


    /**
     * @ORM\Column(type="boolean", length=255)
     */
    private $chronique;

    /**
     * @ORM\Column(type="integer")
     */
    private $duree;

    /**
     * @ORM\Column(type="integer")
     */
    private $nbComprimeJour;

    /**
     * @ORM\Column(type="boolean")
     */
    private $repas;

    /**
     * @ORM\Column(type="boolean")
     */
    private $sales;

    /**
     * @ORM\Column(type="boolean")
     */
    private $sucre;



    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Patient", inversedBy="medicaments",cascade={"persist"})
     */
    private $patient;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Images", mappedBy="medicament",cascade={"persist","remove"})
     */
    private $image;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Notification", mappedBy="medi",cascade={"persist","remove"})
     */
    private $Notification;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Comprime", mappedBy="medicament",cascade={"persist","remove"})
     */
    private $comprime;



    public function __construct()
    {
        $this->joure = new ArrayCollection();
        $this->patient = new ArrayCollection();
        $this->image = new ArrayCollection();
        $this->Notification = new ArrayCollection();
        $this->comprime = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDelai(): ?string
    {
        return $this->delai;
    }

    public function setDelai(string $delai): self
    {
        $this->delai = $delai;

        return $this;
    }

    public function getChronique(): ?string
    {
        return $this->chronique;
    }

    public function setChronique(string $chronique): self
    {
        $this->chronique = $chronique;

        return $this;
    }

    public function getDuree(): ?int
    {
        return $this->duree;
    }

    public function setDuree(int $duree): self
    {
        $this->duree = $duree;

        return $this;
    }

    public function getNbComprimeJour(): ?int
    {
        return $this->nbComprimeJour;
    }

    public function setNbComprimeJour(int $nbComprimeJour): self
    {
        $this->nbComprimeJour = $nbComprimeJour;

        return $this;
    }

    public function getRepas(): ?bool
    {
        return $this->repas;
    }

    public function setRepas(bool $repas): self
    {
        $this->repas = $repas;

        return $this;
    }

    public function getSales(): ?bool
    {
        return $this->sales;
    }

    public function setSales(bool $sales): self
    {
        $this->sales = $sales;

        return $this;
    }

    public function getSucre(): ?bool
    {
        return $this->sucre;
    }

    public function setSucre(bool $sucre): self
    {
        $this->sucre = $sucre;

        return $this;
    }

    public function getNotification(): ?Notification
    {
        return $this->notification;
    }

    public function setNotification(?Notification $notification): self
    {
        $this->notification = $notification;

        return $this;
    }



    /**
     * @return Collection|patient[]
     */
    public function getPatient(): Collection
    {
        return $this->patient;
    }

    public function addPatient(patient $patient): self
    {
        if (!$this->patient->contains($patient)) {
            $this->patient[] = $patient;
        }

        return $this;
    }

    public function removePatient(patient $patient): self
    {
        if ($this->patient->contains($patient)) {
            $this->patient->removeElement($patient);
        }

        return $this;
    }

    /**
     * @return Collection|images[]
     */
    public function getImage(): Collection
    {
        return $this->image;
    }

    public function addImage(images $image): self
    {
        if (!$this->image->contains($image)) {
            $this->image[] = $image;
            $image->setMedicament($this);
        }

        return $this;
    }

    public function removeImage(images $image): self
    {
        if ($this->image->contains($image)) {
            $this->image->removeElement($image);
            // set the owning side to null (unless already changed)
            if ($image->getMedicament() === $this) {
                $image->setMedicament(null);
            }
        }

        return $this;
    }

    public function getNotif(): ?Notification
    {
        return $this->notif;
    }

    public function setNotif(?Notification $notif): self
    {
        $this->notif = $notif;

        return $this;
    }

    public function addNotification(Notification $notification): self
    {
        if (!$this->Notification->contains($notification)) {
            $this->Notification[] = $notification;
            $notification->setMedi($this);
        }

        return $this;
    }

    public function removeNotification(Notification $notification): self
    {
        if ($this->Notification->contains($notification)) {
            $this->Notification->removeElement($notification);
            // set the owning side to null (unless already changed)
            if ($notification->getMedi() === $this) {
                $notification->setMedi(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|comprime[]
     */
    public function getComprime(): Collection
    {
        return $this->comprime;
    }

    public function addComprime(comprime $comprime): self
    {
        if (!$this->comprime->contains($comprime)) {
            $this->comprime[] = $comprime;
            $comprime->setMedicament($this);
        }

        return $this;
    }

    public function removeComprime(comprime $comprime): self
    {
        if ($this->comprime->contains($comprime)) {
            $this->comprime->removeElement($comprime);
            // set the owning side to null (unless already changed)
            if ($comprime->getMedicament() === $this) {
                $comprime->setMedicament(null);
            }
        }

        return $this;
    }

}
