<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PatientRepository")
 */
class Patient
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
    private $age;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $etat;

 

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Medicament", mappedBy="patient" ,cascade={"persist"})
     */
    private $medicaments;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Utilisateur", cascade={"persist"})
     */
    private $utilisat;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Comprime", mappedBy="patient" ,cascade={"persist"})
     */
    private $comprimes;

    public function __construct()
    {
        $this->medicaments = new ArrayCollection();
        $this->comprimes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAge(): ?string
    {
        return $this->age;
    }

    public function setAge(string $age): self
    {
        $this->age = $age;

        return $this;
    }

    public function getEtat(): ?string
    {
        return $this->etat;
    }

    public function setEtat(string $etat): self
    {
        $this->etat = $etat;

        return $this;
    }

    public function getUtilisateur(): ?Utilisateur
    {
        return $this->utilisateur;
    }

    public function setUtilisateur(?Utilisateur $utilisateur): self
    {
        $this->utilisateur = $utilisateur;

        // set (or unset) the owning side of the relation if necessary
        $newPatient = $utilisateur === null ? null : $this;
        if ($newPatient !== $utilisateur->getPatient()) {
            $utilisateur->setPatient($newPatient);
        }

        return $this;
    }

    /**
     * @return Collection|Medicament[]
     */
    public function getMedicaments(): Collection
    {
        return $this->medicaments;
    }

    public function addMedicament(Medicament $medicament): self
    {
        if (!$this->medicaments->contains($medicament)) {
            $this->medicaments[] = $medicament;
            $medicament->addPatient($this);
        }

        return $this;
    }

    public function removeMedicament(Medicament $medicament): self
    {
        if ($this->medicaments->contains($medicament)) {
            $this->medicaments->removeElement($medicament);
            $medicament->removePatient($this);
        }

        return $this;
    }

    public function getUtilisat(): ?Utilisateur
    {
        return $this->utilisat;
    }

    public function setUtilisat(?Utilisateur $utilisat): self
    {
        $this->utilisat = $utilisat;

        return $this;
    }

    /**
     * @return Collection|Comprime[]
     */
    public function getComprimes(): Collection
    {
        return $this->comprimes;
    }

    public function addComprime(Comprime $comprime): self
    {
        if (!$this->comprimes->contains($comprime)) {
            $this->comprimes[] = $comprime;
            $comprime->setPatient($this);
        }

        return $this;
    }

    public function removeComprime(Comprime $comprime): self
    {
        if ($this->comprimes->contains($comprime)) {
            $this->comprimes->removeElement($comprime);
            // set the owning side to null (unless already changed)
            if ($comprime->getPatient() === $this) {
                $comprime->setPatient(null);
            }
        }

        return $this;
    }
}
