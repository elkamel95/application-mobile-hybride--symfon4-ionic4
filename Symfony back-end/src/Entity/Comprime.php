<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ComprimeRepository")
 */
class Comprime
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="boolean")
     */
    private $prisComp;

    /**
     * @ORM\Column(type="datetime")
     */
    private $datePris;

    /**
     * @ORM\Column(type="time")
     */
    private $heurepris;

 

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Alarme", mappedBy="compr" ,cascade={"persist","remove"})
     */
    private $alarmes;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Medicament", inversedBy="comprime" ,cascade={"persist","remove"})
     */
    private $medicament;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Patient", inversedBy="comprimes" ,cascade={"persist"})
     */
    private $patient;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Dates", inversedBy="comprimes",cascade={"persist","remove"})
     */
    private $date;




    public function __construct()
    {
        $this->joure = new ArrayCollection();
        $this->alarmes = new ArrayCollection();
        $this->date = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrisComp(): ?bool
    {
        return $this->prisComp;
    }

    public function setPrisComp(bool $prisComp): self
    {
        $this->prisComp = $prisComp;

        return $this;
    }

    public function getDatePris(): ?\DateTimeInterface
    {
        return $this->datePris;
    }

    public function setDatePris(\DateTimeInterface $datePris): self
    {
        $this->datePris = $datePris;

        return $this;
    }

    public function getHeurepris(): ?\DateTimeInterface
    {
        return $this->heurepris;
    }

    public function setHeurepris(\DateTimeInterface $heurepris): self
    {
        $this->heurepris = $heurepris;

        return $this;
    }

    

    public function getAlarme(): ?Alarme
    {
        return $this->alarme;
    }

    public function setAlarme(?Alarme $alarme): self
    {
        $this->alarme = $alarme;

        return $this;
    }

    /**
     * @return Collection|Alarme[]
     */
    public function getAlarmes(): Collection
    {
        return $this->alarmes;
    }

    public function addAlarme(Alarme $alarme): self
    {
        if (!$this->alarmes->contains($alarme)) {
            $this->alarmes[] = $alarme;
            $alarme->setCompr($this);
        }

        return $this;
    }

    public function removeAlarme(Alarme $alarme): self
    {
        if ($this->alarmes->contains($alarme)) {
            $this->alarmes->removeElement($alarme);
            // set the owning side to null (unless already changed)
            if ($alarme->getCompr() === $this) {
                $alarme->setCompr(null);
            }
        }

        return $this;
    }

    public function getMedicament(): ?Medicament
    {
        return $this->medicament;
    }

    public function setMedicament(?Medicament $medicament): self
    {
        $this->medicament = $medicament;

        return $this;
    }

    public function getPatient(): ?patient
    {
        return $this->patient;
    }

    public function setPatient(?patient $patient): self
    {
        $this->patient = $patient;

        return $this;
    }

    /**
     * @return Collection|dates[]
     */
    public function getDate(): Collection
    {
        return $this->date;
    }

    public function addDate(dates $date): self
    {
        if (!$this->date->contains($date)) {
            $this->date[] = $date;
        }

        return $this;
    }

    public function removeDate(dates $date): self
    {
        if ($this->date->contains($date)) {
            $this->date->removeElement($date);
        }

        return $this;
    }
}
