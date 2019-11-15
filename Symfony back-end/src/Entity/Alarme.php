<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\AlarmeRepository")
 */
class Alarme
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
    private $Demarer;

    /**
     * @ORM\Column(type="boolean")
     */
    private $pause;

    /**
     * @ORM\Column(type="boolean")
     */
    private $stope;

   

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Comprime", inversedBy="alarmes",cascade={"persist","remove"})
     */
    private $compr;

    public function __construct()
    {
        $this->comprime = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDemarer(): ?bool
    {
        return $this->Demarer;
    }

    public function setDemarer(bool $Demarer): self
    {
        $this->Demarer = $Demarer;

        return $this;
    }

    public function getPause(): ?bool
    {
        return $this->pause;
    }

    public function setPause(bool $pause): self
    {
        $this->pause = $pause;

        return $this;
    }

    public function getStope(): ?bool
    {
        return $this->stope;
    }

    public function setStope(bool $stope): self
    {
        $this->stope = $stope;

        return $this;
    }

    /**
     * @return Collection|Comprime[]
     */
    public function getComprime(): Collection
    {
        return $this->comprime;
    }

    public function addComprime(Comprime $comprime): self
    {
        if (!$this->comprime->contains($comprime)) {
            $this->comprime[] = $comprime;
            $comprime->setAlarme($this);
        }

        return $this;
    }

    public function removeComprime(Comprime $comprime): self
    {
        if ($this->comprime->contains($comprime)) {
            $this->comprime->removeElement($comprime);
            // set the owning side to null (unless already changed)
            if ($comprime->getAlarme() === $this) {
                $comprime->setAlarme(null);
            }
        }

        return $this;
    }

    public function getCompr(): ?Comprime
    {
        return $this->compr;
    }

    public function setCompr(?Comprime $compr): self
    {
        $this->compr = $compr;

        return $this;
    }


}
